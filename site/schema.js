/**
 * JSON-LD structured data.
 *
 * Every value here must stay true to what the site actually says; schema that
 * contradicts the visible page is a manual-action risk, not a ranking trick.
 *
 * What still earns visible rich results (2026): Organization, BreadcrumbList,
 * Product/Offer, Article/BlogPosting. FAQPage and HowTo no longer do — Google
 * retired HowTo rich results in 2023 and FAQ rich results in May 2026. They're
 * kept here anyway because they still describe the page to AI Overviews and
 * other answer engines, which increasingly cite from structured content, and
 * carrying them costs nothing.
 *
 * Deliberately NOT included: `aggregateRating`. Review snippets need ratings
 * from real, collected reviews. Inventing them to get stars in the SERP is
 * exactly what Google's spam policy on "fake reviews" targets, and the
 * downside (manual action, site-wide) dwarfs the upside. Add it once real
 * reviews exist — see the README.
 */

const SITE = 'https://www.youtubesummarizer.com';

/** Sitewide: tells Google the site name to display and the brand entity. */
export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE + '/#website',
  name: 'YouTubeSummarizer',
  url: SITE + '/',
  description:
    'Free AI YouTube video summarizer. Paste a link for a TL;DR, key takeaways and timestamped chapters.',
  publisher: { '@id': SITE + '/#org' }
};

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SITE + '/#org',
  name: 'YouTubeSummarizer',
  url: SITE + '/',
  logo: { '@type': 'ImageObject', url: SITE + '/assets/icon-512.png', width: 512, height: 512 },
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@youtubesummarizer.com' },
    { '@type': 'ContactPoint', contactType: 'sales', email: 'teams@youtubesummarizer.com' }
  ]
};

/** The product itself, with the free tier priced honestly at 0. */
export const software = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'YouTube Video Summarizer',
  applicationCategory: 'UtilitiesApplication',
  applicationSubCategory: 'AI video summarizer',
  operatingSystem: 'Any — runs in a web browser',
  url: SITE + '/',
  description:
    'Free AI YouTube video summarizer. Paste any YouTube link and get a TL;DR, key takeaways and timestamped chapters in seconds. No sign-up required.',
  featureList: [
    'Summarize any YouTube video from a link',
    'TL;DR, key takeaways, timestamped chapters and full notes',
    'Clickable timestamps back into the video',
    '38 languages',
    'Markdown export',
    'No sign-up required'
  ],
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', description: '5 summaries a day, videos up to 30 minutes.' },
    { '@type': 'Offer', name: 'Pro', price: '12', priceCurrency: 'USD', description: 'Unlimited summaries, any video length, all four depths.' },
    { '@type': 'Offer', name: 'Team', price: '39', priceCurrency: 'USD', description: 'Five seats, shared workspace, API access.' }
  ]
};

/** Mirrors the three visible steps in the "How to summarize" section. */
export const howto = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to summarize a YouTube video',
  description:
    'Turn any YouTube video into a TL;DR, key takeaways and timestamped chapters in three steps, free and without an account.',
  totalTime: 'PT1M',
  supply: [{ '@type': 'HowToSupply', name: 'A YouTube video URL' }],
  tool: [{ '@type': 'HowToTool', name: 'YouTubeSummarizer' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Paste the YouTube link',
      text: 'Copy the video URL and paste it into the box. Watch links, youtu.be short links, Shorts, embeds and live replays all work.',
      url: SITE + '/#try'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Pick your summary depth',
      text: 'Choose a one-line TL;DR, a list of key takeaways, a timestamped chapter map, or full structured notes. Switching between them is instant.',
      url: SITE + '/#how'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Copy, export or share it',
      text: 'Copy the summary as Markdown, download it as a file, or share the link. Recent summaries stay in your browser.',
      url: SITE + '/#how'
    }
  ]
};

/** Breadcrumb trail, built from the crumbs a page already declares. */
export function breadcrumbs(crumbs, currentPath) {
  if (!crumbs || !crumbs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: SITE + (c.href || currentPath)
    }))
  };
}

/**
 * Pricing page. Product + offers still produces real rich results in Google —
 * unlike FAQPage and HowTo, which were retired (HowTo in 2023, FAQ in May 2026).
 * This is the highest-value markup on the site after Organization.
 */
export const product = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'YouTubeSummarizer',
  description:
    'AI YouTube video summarizer. Free plan with five summaries a day; Pro for unlimited summaries of any length.',
  image: SITE + '/assets/icon-512.png',
  brand: { '@type': 'Brand', name: 'YouTubeSummarizer' },
  offers: {
    '@type': 'AggregateOffer',
    offerCount: 3,
    lowPrice: '0',
    highPrice: '39',
    priceCurrency: 'USD',
    offers: software.offers
  }
};

export const contactPage = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact YouTubeSummarizer',
  url: SITE + '/contact',
  mainEntity: { '@id': SITE + '/#org' }
};

export const aboutPage = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About YouTubeSummarizer',
  url: SITE + '/about',
  mainEntity: { '@id': SITE + '/#org' }
};

export const blogIndex = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': SITE + '/blog#blog',
  name: 'YouTubeSummarizer Blog',
  url: SITE + '/blog',
  description: 'Notes on summarization, studying from video, and getting through more of it in less time.',
  publisher: { '@id': SITE + '/#org' }
};

/**
 * Blog posts. Article markup still earns rich results and feeds AI Overview
 * citations, so it's worth more than the FAQ markup it replaced.
 */
export function article(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.title,
    description: page.description,
    url: SITE + page.path,
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + page.path },
    datePublished: page.datePublished,
    dateModified: page.dateModified || page.datePublished,
    wordCount: page.wordCount,
    image: SITE + '/assets/icon-512.png',
    author: { '@id': SITE + '/#org' },
    publisher: { '@id': SITE + '/#org' },
    isPartOf: { '@id': SITE + '/blog#blog' },
    inLanguage: 'en'
  };
}

const strip = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Build FAQPage markup by reading the page's own visible <details> blocks.
 *
 * Generating it from the rendered body rather than a hand-kept copy means the
 * markup can never drift from what a visitor actually sees — which is Google's
 * stated requirement for FAQ markup, and the thing most sites get wrong.
 */
export function faqFromBody(body) {
  const re =
    /<details class="qa[^"]*"[^>]*>\s*<summary>([\s\S]*?)<span class="qa-chev"[\s\S]*?<div class="qa-body">([\s\S]*?)<\/div>\s*<\/details>/g;

  const mainEntity = [...body.matchAll(re)].map((m) => ({
    '@type': 'Question',
    name: strip(m[1]),
    acceptedAnswer: { '@type': 'Answer', text: strip(m[2]) }
  }));

  if (!mainEntity.length) return null;
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
}

const STATIC = { software, howto, product, contactPage, aboutPage, blogIndex };

/** Returns the <script type="application/ld+json"> blocks for one page. */
export function schemaFor(page, body = '') {
  const blocks = [website, organization];

  (page.schema || []).forEach((k) => {
    if (STATIC[k]) return void blocks.push(STATIC[k]);
    if (k === 'article') return void blocks.push(article(page));
    if (k === 'faq' || k === 'faqpage') {
      const f = faqFromBody(body);
      if (f) blocks.push(f);
    }
  });

  const crumbs = breadcrumbs(page.crumbs, page.path);
  if (crumbs) blocks.push(crumbs);

  return blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join('\n');
}
