/**
 * Expands <!--image:slot-id--> into a real <figure> at render time.
 *
 * Page fragments carry only the token, so the markup, the dimensions and the
 * photographer credit all come from site/image-manifest.json — written by
 * `npm run images`. Re-picking a photo therefore never means touching a page.
 *
 * If the manifest is missing (a fresh clone that hasn't fetched yet) the token
 * expands to nothing and the build still completes; it just warns once.
 */

import { createRequire } from 'node:module';
import { SLOTS_BY_ID } from './images.js';

const require = createRequire(import.meta.url);

let MANIFEST = {};
try {
  MANIFEST = require('./image-manifest.json');
} catch {
  console.warn('site/image-manifest.json not found — run `npm run images`. Photos will be omitted.');
}

const TOKEN = /<!--\s*image:([a-z0-9-]+)\s*-->/gi;

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Both licences allow the photo to be redistributed from our own domain;
 * both ask that the photographer is named and linked. Unsplash's links carry
 * the UTM parameters their guidelines require — those are baked into the
 * manifest at fetch time.
 */
function creditHtml({ credit }) {
  return (
    `<figcaption class="ph-credit">Photo by ` +
    `<a href="${esc(credit.photographerUrl)}" rel="nofollow noopener" target="_blank">${esc(credit.photographer)}</a>` +
    ` on <a href="${esc(credit.providerUrl)}" rel="nofollow noopener" target="_blank">${esc(credit.provider)}</a>` +
    `</figcaption>`
  );
}

function figureHtml(id, entry) {
  // Loading strategy is a layout decision, so it lives with the slot rather
  // than in the fetched manifest.
  const eager = SLOTS_BY_ID[id]?.eager === true;
  const ratio = `${entry.width}/${entry.height}`;
  // The file is already cropped to this ratio, so width/height reserve exactly
  // the painted box — no shift when it loads. The dominant colour fills that
  // box in the meantime.
  return (
    `<figure class="ph reveal" style="--ph-ratio:${ratio};--ph-bg:${esc(entry.color || '#1a1a22')}">` +
    `<img src="/assets/img/${esc(entry.file)}" alt="${esc(entry.alt)}"` +
    ` width="${entry.width}" height="${entry.height}"` +
    ` ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" />` +
    creditHtml(entry) +
    `</figure>`
  );
}

/** Replace every token in a page body. Unknown ids are dropped with a warning. */
export function expandImages(body) {
  return body.replace(TOKEN, (_, id) => {
    const entry = MANIFEST[id];
    if (!entry) {
      console.warn(`  image slot "${id}" is not in the manifest — skipping.`);
      return '';
    }
    return figureHtml(id, entry);
  });
}

/**
 * The first photo on a page, for og:image. A real photograph shares far better
 * than the app icon, and costs nothing extra since the file is already there.
 */
export function leadImage(body) {
  TOKEN.lastIndex = 0;
  const m = TOKEN.exec(body);
  TOKEN.lastIndex = 0;
  return m ? MANIFEST[m[1]] || null : null;
}
