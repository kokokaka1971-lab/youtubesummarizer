/**
 * Unsplash and Pexels clients, sharing one rotating key pool each.
 *
 * Why this runs at build time and not in the browser: the site ships as static
 * files to Apache shared hosting, where no process of ours is running. A key
 * used from the page would be readable by anyone who opens devtools, and would
 * be scraped within days. So the keys stay on the build machine, the photos are
 * downloaded once into public/assets/img/, and what we deploy is plain <img>
 * tags pointing at our own domain. Visitors never touch either provider.
 *
 * Both licences allow that redistribution. Both also ask for attribution, so
 * every photo carries its credit through to the rendered page — see
 * site/image-manifest.json, written by tools/fetch-images.mjs.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { KeyRing, poolFromEnv } from './keyring.js';

const APP_NAME = process.env.UNSPLASH_APP_NAME || 'YouTubeSummarizer';

/** Unsplash asks that attribution links carry these. */
function utm(url) {
  const u = new URL(url);
  u.searchParams.set('utm_source', APP_NAME);
  u.searchParams.set('utm_medium', 'referral');
  return u.toString();
}

/**
 * Load .env into process.env if it hasn't been loaded already.
 * Node 20.12+ has process.loadEnvFile; parse by hand below that.
 */
export async function loadEnv(root) {
  const file = path.join(root, '.env');
  try {
    await fs.access(file);
  } catch {
    return false;
  }
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(file);
    return true;
  }
  const text = await fs.readFile(file, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i.exec(line);
    if (!m || line.trimStart().startsWith('#')) continue;
    if (!(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  return true;
}

/* ------------------------------------------------------------------ */
/* Unsplash                                                            */
/* ------------------------------------------------------------------ */

class Unsplash {
  constructor(keys) {
    this.name = 'unsplash';
    this.ring = new KeyRing('Unsplash', keys);
  }

  async #get(url) {
    const res = await this.ring.run((key) =>
      fetch(url, {
        headers: {
          Authorization: `Client-ID ${key}`,
          'Accept-Version': 'v1'
        }
      })
    );
    if (!res.ok) {
      throw new Error(`Unsplash ${res.status} ${res.statusText} for ${new URL(url).pathname}`);
    }
    return res.json();
  }

  /** @returns {Promise<object[]>} normalized candidates, best first */
  async search({ query, orientation = 'landscape', count = 10 }) {
    const url = new URL('https://api.unsplash.com/search/photos');
    url.searchParams.set('query', query);
    url.searchParams.set('orientation', orientation);
    url.searchParams.set('per_page', String(count));
    url.searchParams.set('content_filter', 'high');
    const data = await this.#get(url.toString());
    return (data.results || []).map((p) => ({
      provider: 'unsplash',
      id: p.id,
      width: p.width,
      height: p.height,
      color: p.color,
      description: p.description || p.alt_description || '',
      // raw + our own params, so we control the delivered size and format
      src: `${p.urls.raw}&fm=jpg&q=80&fit=max`,
      downloadLocation: p.links.download_location,
      credit: {
        provider: 'Unsplash',
        providerUrl: utm('https://unsplash.com/'),
        photographer: p.user.name,
        photographerUrl: utm(p.user.links.html),
        photoUrl: utm(p.links.html)
      }
    }));
  }

  /**
   * Unsplash's API guidelines require pinging download_location whenever a
   * photo is actually used — it is how photographers get credited with a
   * download. Failing this is grounds for losing API access, so it runs even
   * though we already have the bytes.
   */
  async trackDownload(photo) {
    if (!photo.downloadLocation) return;
    try {
      await this.#get(photo.downloadLocation);
    } catch (err) {
      console.warn(`  (download ping failed for ${photo.id}: ${err.message})`);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Pexels                                                              */
/* ------------------------------------------------------------------ */

class Pexels {
  constructor(keys) {
    this.name = 'pexels';
    this.ring = new KeyRing('Pexels', keys);
  }

  async search({ query, orientation = 'landscape', count = 10 }) {
    const url = new URL('https://api.pexels.com/v1/search');
    url.searchParams.set('query', query);
    url.searchParams.set('orientation', orientation);
    url.searchParams.set('per_page', String(count));
    const res = await this.ring.run((key) => fetch(url.toString(), { headers: { Authorization: key } }));
    if (!res.ok) throw new Error(`Pexels ${res.status} ${res.statusText} for "${query}"`);
    const data = await res.json();
    return (data.photos || []).map((p) => ({
      provider: 'pexels',
      id: String(p.id),
      width: p.width,
      height: p.height,
      color: p.avg_color,
      description: p.alt || '',
      // Pexels' own sizes top out below what we want for a hero; the original
      // plus their resize params gives us the same control as Unsplash.
      src: `${p.src.original}?auto=compress&cs=tinysrgb&fm=jpg&q=80`,
      credit: {
        provider: 'Pexels',
        providerUrl: 'https://www.pexels.com/',
        photographer: p.photographer,
        photographerUrl: p.photographer_url,
        photoUrl: p.url
      }
    }));
  }

  async trackDownload() {
    /* Pexels has no download-tracking endpoint. */
  }
}

/* ------------------------------------------------------------------ */

/**
 * Build whichever providers have keys configured. Missing keys are not fatal —
 * a slot that asks for an absent provider falls back to the other one.
 */
export function createProviders() {
  const providers = {};
  const unsplashKeys = poolFromEnv('UNSPLASH_ACCESS_KEYS');
  const pexelsKeys = poolFromEnv('PEXELS_API_KEYS');
  if (unsplashKeys.length) providers.unsplash = new Unsplash(unsplashKeys);
  if (pexelsKeys.length) providers.pexels = new Pexels(pexelsKeys);
  return providers;
}

/** Fetch the bytes. The CDN needs no key and costs no quota. */
export async function download(src, dest) {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Image download failed: ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
  return buf.length;
}
