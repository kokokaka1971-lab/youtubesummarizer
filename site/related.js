/**
 * The "Keep reading" block at the foot of an article.
 *
 * Generated from site/pages.js rather than written into each post, so adding a
 * fourth article makes it appear in the other three automatically instead of
 * leaving three hand-maintained lists to drift apart.
 *
 * Each card is a thumbnail, a short kicker and the article title — no excerpt
 * and no date. At this size the title is doing the work, and an excerpt would
 * only compete with it. The anchor text is the title itself, so the link says
 * what it leads to rather than "read more".
 */

import { createRequire } from 'node:module';
import { PAGES } from './pages.js';

const require = createRequire(import.meta.url);
let MANIFEST = {};
try {
  MANIFEST = require('./image-manifest.json');
} catch {
  /* No photos fetched yet — cards render without thumbnails. */
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * A card's thumbnail is the linked article's own featured photo, cropped to 4:3
 * by tools/make-thumbs.py. It stands for that article, so it is deliberately
 * the same picture the article leads with.
 */
function thumbFor(page) {
  const entry = page.cardImage && MANIFEST[page.cardImage];
  if (!entry) return '';
  const file = entry.file.replace(/\.jpg$/, '-thumb.jpg');
  return (
    `<span class="kr-shot">` +
    `<img src="/assets/img/${esc(file)}" alt="" width="400" height="300" loading="lazy" decoding="async" />` +
    `</span>`
  );
}

/**
 * @param {string} slug  the post being rendered, so it doesn't link to itself
 * @param {number} limit how many cards to show
 */
export function relatedHtml(slug, limit = 4) {
  const posts = Object.entries(PAGES)
    .filter(([key, p]) => p.section === 'blog' && key !== slug && key !== 'blog')
    .sort((a, b) => String(b[1].datePublished || '').localeCompare(String(a[1].datePublished || '')))
    .slice(0, limit);

  if (!posts.length) return '';

  const cards = posts
    .map(
      ([, p]) => `
        <li class="kr-item">
          <a class="kr-link" href="${esc(p.path)}">
            ${thumbFor(p)}
            ${p.cardKicker ? `<span class="kr-kicker">${esc(p.cardKicker)}</span>` : ''}
            <span class="kr-title">${esc(p.title)}</span>
          </a>
        </li>`
    )
    .join('');

  return `<section class="keep-reading" aria-labelledby="keep-reading-h">
      <h2 id="keep-reading-h">Keep reading</h2>
      <ul class="kr-list">${cards}
      </ul>
    </section>`;
}
