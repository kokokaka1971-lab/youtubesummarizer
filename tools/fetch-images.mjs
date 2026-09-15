/**
 * Resolve every slot in site/images.js to a real photo.
 *
 *   npm run images                    fetch anything not already on disk
 *   npm run images -- --refresh <id>  re-pick one slot
 *   npm run images -- --refresh all   re-pick everything
 *   npm run images -- --dry-run       search only, download nothing
 *
 * Runs on your machine, never on the host. Already-resolved slots are skipped,
 * so re-running costs no quota — which is what keeps this safe to call from the
 * build. Keys come from .env and are never written to the manifest or to dist/.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGE_SLOTS } from '../site/images.js';
import { loadEnv, createProviders, download } from './images.js';
import { PoolExhaustedError } from './keyring.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const IMG_DIR = path.join(ROOT, 'public', 'assets', 'img');
const MANIFEST = path.join(ROOT, 'site', 'image-manifest.json');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const refreshArg = args.includes('--refresh') ? args[args.indexOf('--refresh') + 1] : null;
const refreshAll = refreshArg === 'all';

async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  } catch {
    return {};
  }
}

async function onDisk(file) {
  try {
    const s = await fs.stat(path.join(IMG_DIR, file));
    return s.size > 0;
  } catch {
    return false;
  }
}

/**
 * Try the slot's preferred provider, then the other one. A spent pool is a
 * reason to switch providers, not to fail the run — which is the whole point
 * of configuring both.
 */
function providerOrder(providers, preferred) {
  const names = Object.keys(providers);
  return [preferred, ...names.filter((n) => n !== preferred)].filter((n) => providers[n]);
}

async function resolveSlot(slot, providers, taken) {
  const errors = [];
  for (const name of providerOrder(providers, slot.provider)) {
    const provider = providers[name];
    try {
      const candidates = await provider.search({
        query: slot.query,
        orientation: slot.orientation || 'landscape',
        count: 12
      });
      const pick = candidates.find(
        (c) => !taken.has(`${c.provider}:${c.id}`) && c.width >= slot.width
      );
      if (!pick) {
        errors.push(`${name}: no result wide enough for ${slot.width}px`);
        continue;
      }
      return { pick, provider };
    } catch (err) {
      if (err instanceof PoolExhaustedError) {
        console.warn(`  ${err.message} Trying another provider.`);
        errors.push(`${name}: pool exhausted`);
        continue;
      }
      errors.push(`${name}: ${err.message}`);
    }
  }
  throw new Error(`Could not resolve "${slot.id}" — ${errors.join('; ')}`);
}

async function main() {
  const found = await loadEnv(ROOT);
  if (!found) console.warn('No .env found — relying on the ambient environment.');

  const providers = createProviders();
  if (!Object.keys(providers).length) {
    console.error(
      'No image API keys configured. Set UNSPLASH_ACCESS_KEYS and/or PEXELS_API_KEYS in .env.'
    );
    process.exit(1);
  }
  console.log(`Providers: ${Object.keys(providers).join(', ')}`);

  const manifest = await readManifest();
  const taken = new Set(
    Object.values(manifest).map((e) => `${e.provider}:${e.providerId}`)
  );

  let fetched = 0;
  let skipped = 0;

  for (const slot of IMAGE_SLOTS) {
    const entry = manifest[slot.id];
    const wanted = refreshAll || refreshArg === slot.id;
    if (!wanted && entry && (dryRun || (await onDisk(entry.file)))) {
      skipped++;
      continue;
    }
    if (wanted && entry) taken.delete(`${entry.provider}:${entry.providerId}`);

    console.log(`\n${slot.id}  "${slot.query}"`);
    const { pick, provider } = await resolveSlot(slot, providers, taken);
    taken.add(`${pick.provider}:${pick.id}`);
    console.log(`  ${pick.provider} ${pick.id} by ${pick.credit.photographer} (${pick.width}x${pick.height})`);

    // Crop to the final aspect at the CDN rather than in CSS. The file we
    // save is then exactly what gets painted, so the width/height attributes
    // reserve the right box and nothing shifts as the image loads.
    const [aw, ah] = (slot.aspect || '16/9').split('/').map(Number);
    const height = Math.round((slot.width * ah) / aw);

    const file = `${slot.id}.jpg`;
    if (!dryRun) {
      const src = new URL(pick.src);
      src.searchParams.set('w', String(slot.width));
      src.searchParams.set('h', String(height));
      src.searchParams.set('fit', 'crop');
      // Both CDNs are imgix-backed: keep faces, fall back to the busiest region.
      src.searchParams.set('crop', 'faces,entropy');
      const bytes = await download(src.toString(), path.join(IMG_DIR, file));
      // Unsplash requires this ping whenever a photo is actually used.
      await provider.trackDownload(pick);
      console.log(`  saved assets/img/${file} (${Math.round(bytes / 1024)} KB)`);
    }

    manifest[slot.id] = {
      file,
      provider: pick.provider,
      providerId: pick.id,
      width: slot.width,
      height,
      alt: slot.alt,
      color: pick.color,
      credit: pick.credit,
      fetchedAt: new Date().toISOString().slice(0, 10)
    };
    fetched++;
  }

  if (!dryRun) {
    const ordered = Object.fromEntries(
      IMAGE_SLOTS.filter((s) => manifest[s.id]).map((s) => [s.id, manifest[s.id]])
    );
    await fs.writeFile(MANIFEST, JSON.stringify(ordered, null, 2) + '\n');
  }

  console.log(
    `\n${fetched} fetched, ${skipped} already present${dryRun ? ' (dry run — nothing written)' : ''}`
  );
  for (const p of Object.values(providers)) console.log(p.ring.report());
}

main().catch((err) => {
  console.error(`\n${err.message}`);
  process.exit(1);
});
