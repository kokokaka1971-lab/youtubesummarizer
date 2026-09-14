/**
 * Every page on the site. `file` is relative to site/pages/.
 *
 * Adding a page: drop an .html fragment in site/pages/ and add an entry here.
 * If it belongs in the footer or nav, add it to the lists in site/layout.js too.
 */

const USE_CASE_CRUMBS = [
  { href: '/', label: 'Home' },
  { href: '/use-cases', label: 'Use cases' }
];

const BLOG_CRUMBS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' }
];

export const PAGES = {
  home: {
    path: '/',
    file: 'home.html',
    section: 'home',
    // Title targets the head term "YouTube video summarizer" plus the three
    // modifiers every ranking competitor carries: free, AI, no sign-up. 56 chars,
    // so Google won't truncate it.
    title: 'YouTube Video Summarizer — Free AI Summaries, No Sign-Up',
    description:
      'Paste a YouTube link and get a free AI summary in seconds — TL;DR, key takeaways and timestamped chapters you can click. No sign-up, 38 languages.',
    schema: ['software', 'howto', 'faq']
  },

  /* ---- Product ---- */
  features: {
    path: '/features',
    file: 'features.html',
    section: 'features',
    title: 'YouTube Summarizer Features',
    description:
      'Timestamped chapters you can click, four summary depths, 38 languages, and Markdown export. Everything the YouTube summarizer does.',
    schema: []
  },
  'how-it-works': {
    path: '/how-it-works',
    file: 'how-it-works.html',
    section: 'how',
    title: 'How to Summarize a YouTube Video',
    description:
      'How to summarize a YouTube video in three steps — paste the link, pick your depth, export the notes. Plus what the tool cannot do.',
    schema: ['howto']
  },
  pricing: {
    path: '/pricing',
    file: 'pricing.html',
    section: 'pricing',
    title: 'Pricing — Free, Pro and Team Plans',
    description:
      'YouTube summarizer pricing: free forever with five summaries a day, Pro at /mo for unlimited videos of any length, Team from 9/mo.',
    schema: ['product']
  },

  /* ---- Use cases ---- */
  'use-cases': {
    path: '/use-cases',
    file: 'use-cases/index.html',
    section: 'use-cases',
    title: 'YouTube Summarizer Use Cases',
    description:
      'How students, researchers, creators, and teams use YouTube Summarizer to get through more video in less time.',
    crumbs: [{ href: '/', label: 'Home' }, { label: 'Use cases' }]
  },
  'use-cases/students': {
    path: '/use-cases/students',
    file: 'use-cases/students.html',
    section: 'use-cases',
    title: 'YouTube Summarizer for Students',
    description:
      'Turn a semester of recorded lectures into a revision pack with chapter maps and timestamps you can jump back into.',
    crumbs: [...USE_CASE_CRUMBS, { label: 'Students' }]
  },
  'use-cases/researchers': {
    path: '/use-cases/researchers',
    file: 'use-cases/researchers.html',
    section: 'use-cases',
    title: 'YouTube Summarizer for Researchers',
    description:
      'Triage a conference playlist, shortlist the talks worth your full attention, and cite the exact timestamp of a claim.',
    crumbs: [...USE_CASE_CRUMBS, { label: 'Researchers' }]
  },
  'use-cases/creators': {
    path: '/use-cases/creators',
    file: 'use-cases/creators.html',
    section: 'use-cases',
    title: 'YouTube Summarizer for Creators',
    description:
      'Research a topic without losing a week to it — scan a channel, find the gaps, and draft show notes from your own uploads.',
    crumbs: [...USE_CASE_CRUMBS, { label: 'Creators' }]
  },
  'use-cases/teams': {
    path: '/use-cases/teams',
    file: 'use-cases/teams.html',
    section: 'use-cases',
    title: 'YouTube Summarizer for Teams',
    description:
      'Share the takeaway, not a two-hour link. Shared history, a house summary format, and API access for your pipelines.',
    crumbs: [...USE_CASE_CRUMBS, { label: 'Teams' }]
  },

  /* ---- Company ---- */
  about: {
    path: '/about',
    file: 'about.html',
    section: 'about',
    title: 'About',
    description:
      'Why we built a YouTube summarizer that anchors every claim to a timestamp instead of asking you to trust it.',
    schema: ['aboutPage'],
    crumbs: [{ href: '/', label: 'Home' }, { label: 'About' }]
  },
  faq: {
    path: '/faq',
    file: 'faq.html',
    section: 'faq',
    title: 'YouTube Summarizer FAQ',
    description:
      'Answers on captions, video length, accuracy, languages, privacy and billing for the free AI YouTube video summarizer.',
    schema: ['faqpage']
  },
  contact: {
    path: '/contact',
    file: 'contact.html',
    section: 'contact',
    title: 'Contact',
    description: 'Contact the YouTubeSummarizer team — support, sales, education pricing, security and press, with a reply inside a working day.',
    schema: ['contactPage'],
    crumbs: [{ href: '/', label: 'Home' }, { label: 'Contact' }]
  },
  blog: {
    path: '/blog',
    file: 'blog/index.html',
    section: 'blog',
    title: 'Blog',
    description: 'Notes on summarizing YouTube videos, studying from video, and getting through more of it in less time.',
    schema: ['blogIndex'],
    crumbs: [{ href: '/', label: 'Home' }, { label: 'Blog' }]
  },
  'blog/how-to-study-from-youtube': {
    path: '/blog/how-to-study-from-youtube',
    file: 'blog/how-to-study-from-youtube.html',
    section: 'blog',
    title: 'How to actually study from YouTube',
    description:
      'Watching a lecture twice is not studying. A method for turning video into recall practice that holds up at exam time.',
    schema: ['article'],
    datePublished: '2026-08-19',
    crumbs: [...BLOG_CRUMBS, { label: 'Studying from YouTube' }]
  },
  'blog/why-timestamps-matter': {
    path: '/blog/why-timestamps-matter',
    file: 'blog/why-timestamps-matter.html',
    section: 'blog',
    title: 'Why every summary should carry timestamps',
    description:
      'A summary you cannot check is a rumour. Timestamps turn verification from a rewatch into a single click.',
    schema: ['article'],
    datePublished: '2026-07-02',
    crumbs: [...BLOG_CRUMBS, { label: 'Why timestamps matter' }]
  },
  'blog/transcripts-are-not-summaries': {
    path: '/blog/transcripts-are-not-summaries',
    file: 'blog/transcripts-are-not-summaries.html',
    section: 'blog',
    title: 'A transcript is not a summary',
    description:
      'Most tools hand you the same words in a different box. What has to happen between transcript and useful notes.',
    schema: ['article'],
    datePublished: '2026-05-28',
    crumbs: [...BLOG_CRUMBS, { label: 'Transcripts are not summaries' }]
  },

  /* ---- Legal ---- */
  privacy: {
    path: '/privacy',
    file: 'privacy.html',
    section: 'legal',
    title: 'Privacy policy',
    description: 'What we collect, what we do not, how long we keep it, and how to get it deleted.',
    crumbs: [{ href: '/', label: 'Home' }, { label: 'Privacy' }]
  },
  terms: {
    path: '/terms',
    file: 'terms.html',
    section: 'legal',
    title: 'Terms of service',
    description: 'The agreement for using YouTube Summarizer — acceptable use, billing, liability, and cancellation.',
    crumbs: [{ href: '/', label: 'Home' }, { label: 'Terms' }]
  },
  cookies: {
    path: '/cookies',
    file: 'cookies.html',
    section: 'legal',
    title: 'Cookie policy',
    description: 'Which cookies and local storage keys this site uses, what each one does, and how to clear them.',
    crumbs: [{ href: '/', label: 'Home' }, { label: 'Cookies' }]
  },

  /* ---- Errors ---- */
  404: {
    path: '/404',
    file: '404.html',
    section: '',
    title: 'Page not found',
    description: 'That page does not exist.'
  }
};

/** path → page, built once at import. */
export const BY_PATH = Object.fromEntries(
  Object.entries(PAGES).map(([slug, p]) => [p.path, { ...p, slug }])
);
