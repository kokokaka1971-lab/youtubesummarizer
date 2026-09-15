/**
 * A pool of interchangeable API keys, spent one at a time.
 *
 * Unsplash and Pexels both rate-limit per key, per hour. A pool lets a batch
 * run past any single key's ceiling: we use one key until it reports nothing
 * left, retire it, and carry on with the next. A retired key is not gone — it
 * comes back once its window resets, which matters for long build runs.
 *
 * Keys are read from the environment by the caller and never logged. Anything
 * this module prints shows a key as "#3 of 7", never the value.
 */

/** Key is spent for now; it returns at `resetAt`. */
const SPENT = 'spent';
/** Provider rejected the credential itself. Never retry it. */
const DEAD = 'dead';
const OK = 'ok';

/** Thrown when no key in the pool can serve a request right now. */
export class PoolExhaustedError extends Error {
  constructor(label, resetAt) {
    const wait = resetAt ? Math.max(0, Math.ceil((resetAt - Date.now()) / 60000)) : null;
    super(
      `All ${label} keys are spent` +
        (wait === null ? '.' : ` — the earliest resets in about ${wait} min.`)
    );
    this.name = 'PoolExhaustedError';
    this.label = label;
    this.resetAt = resetAt;
  }
}

export class KeyRing {
  /**
   * @param {string} label       provider name, for messages
   * @param {string[]} keys      the pool, tried in the order given
   * @param {object} [opts]
   * @param {number} [opts.reserve]  stop using a key when this many requests
   *                                 remain, leaving headroom for other tools
   *                                 sharing the same key. Default 0.
   */
  constructor(label, keys, { reserve = 0 } = {}) {
    const clean = [...new Set(keys.map((k) => k.trim()).filter(Boolean))];
    if (!clean.length) throw new Error(`No ${label} API keys configured.`);
    this.label = label;
    this.reserve = reserve;
    this.keys = clean.map((value, i) => ({
      value,
      n: i + 1,
      state: OK,
      remaining: null, // unknown until the first response
      resetAt: 0,
      used: 0
    }));
    this.cursor = 0;
  }

  get size() {
    return this.keys.length;
  }

  /** Bring back any key whose rate-limit window has passed. */
  #revive() {
    const now = Date.now();
    for (const k of this.keys) {
      if (k.state === SPENT && k.resetAt && k.resetAt <= now) {
        k.state = OK;
        k.remaining = null;
        k.resetAt = 0;
      }
    }
  }

  /**
   * The key to use right now: the one at the cursor if it still has room,
   * otherwise the next usable one. Returns null when the pool is dry.
   */
  #current() {
    this.#revive();
    for (let hop = 0; hop < this.keys.length; hop++) {
      const k = this.keys[(this.cursor + hop) % this.keys.length];
      if (k.state === OK) {
        this.cursor = (this.cursor + hop) % this.keys.length;
        return k;
      }
    }
    return null;
  }

  /** Earliest moment any spent key becomes usable again, or 0 if none will. */
  #nextReset() {
    const times = this.keys.filter((k) => k.state === SPENT && k.resetAt).map((k) => k.resetAt);
    return times.length ? Math.min(...times) : 0;
  }

  /**
   * Record what a response told us about the key that served it. Providers
   * report the remaining quota on every response, so we usually retire a key
   * on the request *before* it would have failed rather than burning one.
   */
  #readLimits(key, res) {
    const remaining = Number(res.headers.get('x-ratelimit-remaining'));
    if (Number.isFinite(remaining)) {
      key.remaining = remaining;
      if (remaining <= this.reserve) this.#retire(key, res);
    }
  }

  #retire(key, res) {
    key.state = SPENT;
    // Pexels sends an absolute reset time; Unsplash sends nothing, and its
    // quota is a rolling hour, so assume the full hour.
    const reset = Number(res?.headers.get('x-ratelimit-reset'));
    key.resetAt = Number.isFinite(reset) && reset > 0 ? reset * 1000 : Date.now() + 60 * 60 * 1000;
    if (this.cursor === this.keys.indexOf(key)) {
      this.cursor = (this.cursor + 1) % this.keys.length;
    }
  }

  /**
   * Run `send(key)` against the pool, rotating past keys that are finished.
   *
   * `send` must return a Response. A 429 (or Unsplash's 403 "Rate Limit
   * Exceeded") retires the key and retries the *same* request on the next one,
   * so the caller never sees a rate-limit failure until the whole pool is dry.
   * A 401/403-with-bad-credentials kills the key outright.
   *
   * @param {(key: string) => Promise<Response>} send
   * @returns {Promise<Response>}
   */
  async run(send) {
    let attempts = 0;
    for (;;) {
      const key = this.#current();
      if (!key) throw new PoolExhaustedError(this.label, this.#nextReset());

      // Guard against a pathological loop if a provider keeps handing back 429
      // with a reset time already in the past.
      if (++attempts > this.keys.length * 3) {
        throw new PoolExhaustedError(this.label, this.#nextReset());
      }

      let res;
      try {
        res = await send(key.value);
      } catch (err) {
        // Network-level failure is not the key's fault — retry once on the
        // same key, then let it surface.
        if (attempts <= 1) continue;
        throw err;
      }
      key.used++;

      if (res.status === 429) {
        this.#retire(key, res);
        console.warn(`  ${this.label} key #${key.n}/${this.size} hit its limit — rotating.`);
        continue;
      }

      if (res.status === 401 || res.status === 403) {
        // Unsplash answers 403 for both "rate limited" and "forbidden"; the
        // body tells them apart. Read it once — the response is spent either way.
        const body = await res.clone().text().catch(() => '');
        if (/rate limit/i.test(body)) {
          this.#retire(key, res);
          console.warn(`  ${this.label} key #${key.n}/${this.size} is out of quota — rotating.`);
          continue;
        }
        key.state = DEAD;
        console.warn(`  ${this.label} key #${key.n}/${this.size} was rejected (${res.status}) — dropping it.`);
        continue;
      }

      this.#readLimits(key, res);
      return res;
    }
  }

  /** One-line summary for the end of a run. No key values. */
  report() {
    const live = this.keys.filter((k) => k.state === OK).length;
    const calls = this.keys.reduce((n, k) => n + k.used, 0);
    const dead = this.keys.filter((k) => k.state === DEAD).length;
    return (
      `${this.label}: ${calls} request${calls === 1 ? '' : 's'} across ` +
      `${this.keys.filter((k) => k.used).length}/${this.size} keys` +
      ` (${live} still usable${dead ? `, ${dead} rejected` : ''})`
    );
  }
}

/**
 * Read a comma-separated pool out of the environment.
 * Returns [] when unset, so callers can decide whether the provider is optional.
 */
export function poolFromEnv(name) {
  return (process.env[name] || '').split(',').map((s) => s.trim()).filter(Boolean);
}
