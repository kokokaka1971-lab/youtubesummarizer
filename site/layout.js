/**
 * Shared page shell — head, nav, footer.
 *
 * Every page on the site is rendered through `renderPage()`, so the navigation
 * and footer exist in exactly one place. Page bodies live as plain .html
 * fragments under site/pages/ and are registered in site/pages.js.
 */

import { schemaFor } from './schema.js';
import { expandImages, leadImage } from './image-tag.js';

const BRAND_DEFS = `
<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
  <defs>
    <linearGradient id="ysGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FF5A36" />
      <stop offset=".62" stop-color="#E2242C" />
    </linearGradient>
  </defs>
</svg>`;

const mark = (size) => `<svg viewBox="0 0 32 32" width="${size}" height="${size}">
  <rect width="32" height="32" rx="9" fill="url(#ysGrad)" />
  <path d="M7.25 9.4v13.2L17.65 16z" fill="#fff" stroke="#fff" stroke-width="1.8" stroke-linejoin="round" />
  <g fill="#fff">
    <rect x="20.45" y="11.4" width="5.2" height="2" rx="1" />
    <rect x="20.45" y="15" width="5.2" height="2" rx="1" />
    <rect x="20.45" y="18.6" width="3.2" height="2" rx="1" />
  </g>
</svg>`;

/**
 * Primary navigation. `section` marks which item is highlighted.
 *
 * Features, How it works and Use cases are all "explain the product" pages, so
 * they sit under one Product menu rather than taking three of seven top-level
 * slots. That leaves five items — clean to read, and nothing loses a home.
 */
const NAV = [
  { href: '/', label: 'Home', section: 'home' },
  {
    label: 'Product',
    section: 'product',
    children: [
      { href: '/features', label: 'Features', blurb: 'Everything it does, in detail', section: 'features' },
      { href: '/how-it-works', label: 'How it works', blurb: 'From a pasted link to structured notes', section: 'how' },
      { href: '/use-cases', label: 'Use cases', blurb: 'Students, researchers, creators, teams', section: 'use-cases' }
    ]
  },
  { href: '/pricing', label: 'Pricing', section: 'pricing' },
  { href: '/blog', label: 'Blog', section: 'blog' },
  { href: '/faq', label: 'FAQ', section: 'faq' }
];

/**
 * Footer columns — the full map of the site, in the same order as the nav.
 *
 * Product mirrors the nav's Product menu plus Pricing; Use cases holds the four
 * role pages under their hub; Company covers who we are and how to reach us;
 * Legal stands alone. "Summarize a video" is not repeated here — the brand block
 * beside these columns already carries it as the footer's call to action.
 */
const FOOTER = [
  {
    title: 'Product',
    links: [
      ['/features', 'Features'],
      ['/how-it-works', 'How it works'],
      ['/use-cases', 'Use cases'],
      ['/pricing', 'Pricing']
    ]
  },
  {
    title: 'Use cases',
    links: [
      ['/use-cases/students', 'Students'],
      ['/use-cases/researchers', 'Researchers'],
      ['/use-cases/creators', 'Creators'],
      ['/use-cases/teams', 'Teams']
    ]
  },
  {
    title: 'Company',
    links: [
      ['/about', 'About'],
      ['/blog', 'Blog'],
      ['/faq', 'FAQ'],
      ['/contact', 'Contact']
    ]
  },
  {
    title: 'Legal',
    links: [
      ['/privacy', 'Privacy'],
      ['/terms', 'Terms'],
      ['/cookies', 'Cookies']
    ]
  }
];

/** Desktop navigation. Items with `children` render as a disclosure menu. */
function navHtml(active) {
  return NAV.map((n) => {
    if (!n.children) {
      return `<a href="${n.href}"${n.section === active ? ' aria-current="page"' : ''}>${n.label}</a>`;
    }

    // The parent reads as current whenever one of its pages is open.
    const isOpen = n.children.some((c) => c.section === active);
    const items = n.children
      .map(
        (c) => `<a href="${c.href}"${c.section === active ? ' aria-current="page"' : ''}>
            <span class="np-label">${c.label}</span>
            <span class="np-blurb">${c.blurb}</span>
          </a>`
      )
      .join('\n          ');

    return `<div class="nav-has-menu">
        <button type="button" class="nav-trigger${isOpen ? ' is-current' : ''}" aria-expanded="false" aria-controls="navMenu-${n.section}">
          ${n.label}
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="nav-panel" id="navMenu-${n.section}" hidden>
          ${items}
        </div>
      </div>`;
  }).join('\n      ');
}

/** Mobile menu — flat, with the grouped items under a small label. */
function mobileNavHtml(active) {
  return NAV.map((n) => {
    if (!n.children) {
      return `<a href="${n.href}"${n.section === active ? ' aria-current="page"' : ''}>${n.label}</a>`;
    }
    return (
      `<p class="mm-label">${n.label}</p>\n    ` +
      n.children
        .map(
          (c) =>
            `<a href="${c.href}"${c.section === active ? ' aria-current="page"' : ''}>${c.label}</a>`
        )
        .join('\n    ')
    );
  }).join('\n    ');
}

function footerHtml() {
  const cols = FOOTER.map(
    (c) => `<div>
          <h4>${c.title}</h4>
          ${c.links.map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n          ')}
        </div>`
  ).join('\n        ');

  return `<footer class="footer">
  <div class="wrap">

    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true">${mark(30)}</span>
          <span class="brand-text">YouTube<span>Summarizer</span></span>
        </a>
        <p class="foot-line">Notes worth keeping, from videos worth watching.</p>
        <a class="foot-cta" href="/#try">
          Summarize a video
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
        </a>
      </div>

      <nav class="foot-nav" aria-label="Footer">
        ${cols}
      </nav>
    </div>

    <div class="foot-bottom">
      <p>© <span id="yrNow">2026</span> YouTubeSummarizer. Not affiliated with YouTube or Google.</p>
      <p class="foot-note">Made for people with too many tabs open.</p>
    </div>
  </div>
</footer>`;
}

/** Breadcrumbs for pages that sit below the top level. */
function crumbsHtml(crumbs) {
  if (!crumbs || !crumbs.length) return '';
  const items = crumbs
    .map((c) =>
      c.href
        ? `<li><a href="${c.href}">${c.label}</a></li>`
        : `<li aria-current="page">${c.label}</li>`
    )
    .join('');
  return `<nav class="crumbs" aria-label="Breadcrumb"><div class="wrap"><ol>${items}</ol></div></nav>`;
}

export function renderPage(page, body) {
  // Google truncates around 60 characters, so the brand suffix is only worth
  // adding when it fits. Past that it costs keywords and buys nothing.
  const withBrand = `${page.title} — YouTubeSummarizer`;
  const title =
    page.slug === 'home' ? page.title : withBrand.length <= 60 ? withBrand : page.title;
  const canonical = 'https://www.youtubesummarizer.com' + (page.path === '/' ? '/' : page.path);

  // Photos are stored as <!--image:slot--> tokens in the page fragments and
  // resolved here, so the dev server and the static build agree. A page that
  // has one shares it instead of the app icon.
  const lead = leadImage(body);
  body = expandImages(body);
  const ogImage = lead
    ? `https://www.youtubesummarizer.com/assets/img/${lead.file}`
    : 'https://www.youtubesummarizer.com/assets/icon-512.png';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${page.description}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${page.description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${ogImage}" />${
  lead ? `
<meta property="og:image:width" content="${lead.width}" />
<meta property="og:image:height" content="${lead.height}" />
<meta property="og:image:alt" content="${lead.alt.replace(/"/g, '&quot;')}" />` : ''
}
<meta property="og:site_name" content="YouTubeSummarizer" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="robots" content="${page.slug === '404' ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />
<meta name="theme-color" content="#0b0b12" />
${schemaFor(page, body)}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/assets/icon-180.png" />
<link rel="mask-icon" href="/assets/favicon.svg" color="#E2242C" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/styles.css" />
<script>
  /* Apply the saved theme before first paint to avoid a flash of the wrong palette. */
  try {
    var t = localStorage.getItem('ys-theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
</script>
<noscript>
  <!-- .reveal elements start at opacity:0 and are switched on by an
       IntersectionObserver in site.js. Without JavaScript that observer never
       runs, so every revealed section — including all the photography — would
       stay invisible. Show it all instead; the animation is decoration. -->
  <style>.reveal { opacity: 1 !important; transform: none !important; }</style>
</noscript>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${BRAND_DEFS}

<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a class="brand" href="/" aria-label="YouTube Summarizer home">
      <span class="brand-mark" aria-hidden="true">${mark(30)}</span>
      <span class="brand-text">YouTube<span>Summarizer</span></span>
    </a>

    <nav class="nav-links" aria-label="Primary">
      ${navHtml(page.section)}
    </nav>

    <div class="nav-actions">
      <button class="icon-btn" id="themeToggle" type="button" aria-label="Switch colour theme" title="Switch colour theme">
        <svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>
      </button>
      <a class="btn btn-ghost hide-sm" href="/pricing">Sign in</a>
      <a class="btn btn-primary hide-xs" href="/#try">Start free</a>
      <button class="icon-btn menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu" hidden>
    ${mobileNavHtml(page.section)}
    <p class="mm-label">Company</p>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <!-- The nav's "Start free" is hidden on narrow screens, so it lives here instead. -->
    <a class="btn btn-primary" href="/#try">Start free</a>
  </div>
</header>
${crumbsHtml(page.crumbs)}
<main id="main">
${body}
</main>

${footerHtml()}

<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
<script src="/assets/site.js"></script>${page.slug === 'home' ? '\n<script src="/assets/app.js"></script>' : ''}
</body>
</html>
`;
}
