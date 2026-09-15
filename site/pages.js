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
    path: '/how-to-study-from-youtube',
    file: 'blog/how-to-study-from-youtube.html',
    section: 'blog',
    title: 'How to actually study from YouTube',
    description:
      'Watching a lecture twice is not studying. A method for turning video into recall practice that holds up at exam time.',
    cardKicker: 'Study method',
    cardImage: 'blog-how-to-study',
    schema: ['article', 'faq'],
    datePublished: '2026-08-19',
    crumbs: [...BLOG_CRUMBS, { label: 'Studying from YouTube' }]
  },
  'blog/why-timestamps-matter': {
    path: '/why-timestamps-matter',
    file: 'blog/why-timestamps-matter.html',
    section: 'blog',
    title: 'Why every summary should carry timestamps',
    description:
      'A summary you cannot check is a rumour. Timestamps turn verification from a rewatch into a single click.',
    cardKicker: 'Checking the output',
    cardImage: 'blog-timestamps',
    schema: ['article', 'faq'],
    datePublished: '2026-07-02',
    crumbs: [...BLOG_CRUMBS, { label: 'Why timestamps matter' }]
  },
  'blog/transcripts-are-not-summaries': {
    path: '/transcripts-are-not-summaries',
    file: 'blog/transcripts-are-not-summaries.html',
    section: 'blog',
    title: 'A transcript is not a summary',
    description:
      'Most tools hand you the same words in a different box. What has to happen between transcript and useful notes.',
    cardKicker: 'Transcript vs summary',
    cardImage: 'blog-transcripts',
    schema: ['article', 'faq'],
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
  },

  /* ---- Guides (batch 01) ---- */
  'free-youtube-summarizer-no-signup': {
    path: '/free-youtube-summarizer-no-signup',
    file: 'free-youtube-summarizer-no-signup.html',
    section: 'guides',
    title: 'Free YouTube Summarizer — No Sign-Up',
    description:
      'A free YouTube summarizer with no signup or login. What free actually covers, the limits tools hide, and how to test one in two minutes.',
    cardKicker: 'Free tier',
    cardImage: 'free-youtube-summarizer-no-signup-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-with-timestamps': {
    path: '/youtube-summarizer-with-timestamps',
    file: 'youtube-summarizer-with-timestamps.html',
    section: 'guides',
    title: 'YouTube Summarizer With Timestamps',
    description:
      'A YouTube summarizer with timestamps on every claim, so you can jump straight back to the moment. How they work and how to spot fake ones.',
    cardKicker: 'Timestamps',
    cardImage: 'youtube-summarizer-with-timestamps-lead',
    schema: ['article', 'faq']
  },

  'youtube-transcript-summarizer': {
    path: '/youtube-transcript-summarizer',
    file: 'youtube-transcript-summarizer.html',
    section: 'guides',
    title: 'YouTube Transcript Summarizer',
    description:
      'Turn a YouTube transcript into a summary you can check. What the caption track gives you, where auto-captions fail, and what has to happen next.',
    cardKicker: 'Transcripts',
    cardImage: 'youtube-transcript-summarizer-lead',
    schema: ['article', 'faq']
  },

  'long-youtube-video-summarizer': {
    path: '/long-youtube-video-summarizer',
    file: 'long-youtube-video-summarizer.html',
    section: 'guides',
    title: 'Long YouTube Video Summarizer',
    description:
      'Summarize long YouTube videos without losing the middle. Why long videos fail silently in most tools, and how to check yours actually read to the end.',
    cardKicker: 'Long videos',
    cardImage: 'long-youtube-video-summarizer-lead',
    schema: ['article', 'faq']
  },

  'youtube-key-points-generator': {
    path: '/youtube-key-points-generator',
    file: 'youtube-key-points-generator.html',
    section: 'guides',
    title: 'YouTube Key Points Generator',
    description:
      'Pull the key points out of any YouTube video, each anchored to the second it came from. What makes a takeaway useful and what makes it filler.',
    cardKicker: 'Key points',
    cardImage: 'youtube-key-points-generator-lead',
    schema: ['article', 'faq']
  },

  'youtube-notes-generator': {
    path: '/youtube-notes-generator',
    file: 'youtube-notes-generator.html',
    section: 'guides',
    title: 'YouTube Notes Generator',
    description:
      'Turn a YouTube video into structured notes with timestamps you can click. Where generated notes help, and where they quietly replace the learning.',
    cardKicker: 'Notes',
    cardImage: 'youtube-notes-generator-lead',
    schema: ['article', 'faq']
  },

  'best-youtube-summarizer': {
    path: '/best-youtube-summarizer',
    file: 'best-youtube-summarizer.html',
    section: 'guides',
    title: 'Best YouTube Summarizer: How to Choose',
    description:
      'How to judge a YouTube summarizer instead of trusting a ranked list. Seven tests you can run in ten minutes, and the failures they expose.',
    cardKicker: 'Choosing a tool',
    cardImage: 'best-youtube-summarizer-lead',
    schema: ['article', 'faq']
  },

  'how-to-summarize-a-youtube-video': {
    path: '/how-to-summarize-a-youtube-video',
    file: 'how-to-summarize-a-youtube-video.html',
    section: 'guides',
    title: 'How to Summarize a YouTube Video',
    description:
      'How to summarize a YouTube video in three steps, plus the manual methods, what each one costs you, and the cases where none of them work.',
    cardKicker: 'Getting started',
    cardImage: 'how-to-summarize-a-youtube-video-lead',
    schema: ['article', 'faq']
  },

  'youtube-podcast-summarizer': {
    path: '/youtube-podcast-summarizer',
    file: 'youtube-podcast-summarizer.html',
    section: 'guides',
    title: 'YouTube Podcast Summarizer',
    description:
      'Summarize long podcast episodes and interviews on YouTube, with timestamps on every claim so you can jump to the ten minutes worth hearing.',
    cardKicker: 'Podcasts',
    cardImage: 'youtube-podcast-summarizer-lead',
    schema: ['article', 'faq']
  },

  'lecture-video-summarizer': {
    path: '/lecture-video-summarizer',
    file: 'lecture-video-summarizer.html',
    section: 'guides',
    title: 'Lecture Video Summarizer',
    description:
      'Turn recorded lectures into a chapter map and notes with timestamps, so revision means rewatching four minutes instead of ninety.',
    cardKicker: 'Lectures',
    cardImage: 'lecture-video-summarizer-lead',
    schema: ['article', 'faq']
  },

  'youtube-tutorial-summarizer': {
    path: '/youtube-tutorial-summarizer',
    file: 'youtube-tutorial-summarizer.html',
    section: 'guides',
    title: 'YouTube Tutorial Summarizer',
    description:
      'Turn a YouTube tutorial into numbered steps with timestamps, so you can follow along without scrubbing back every thirty seconds.',
    cardKicker: 'Tutorials',
    cardImage: 'youtube-tutorial-summarizer-lead',
    schema: ['article', 'faq']
  },

  'multilingual-youtube-summarizer': {
    path: '/multilingual-youtube-summarizer',
    file: 'multilingual-youtube-summarizer.html',
    section: 'guides',
    title: 'Multilingual YouTube Summarizer',
    description:
      'Summarize YouTube videos across 38 languages, including summarizing a foreign-language video into English. What translates well and what does not.',
    cardKicker: 'Languages',
    cardImage: 'multilingual-youtube-summarizer-lead',
    schema: ['article', 'faq']
  },

  'summarize-1-hour-youtube-video': {
    path: '/summarize-1-hour-youtube-video',
    file: 'summarize-1-hour-youtube-video.html',
    section: 'guides',
    title: 'How to Summarize a 1-Hour YouTube Video',
    description:
      'Summarize a 1-hour YouTube video without losing the middle. Why the hour mark is where tools start failing quietly, and how to check yours did not.',
    cardKicker: 'One hour',
    cardImage: 'summarize-1-hour-youtube-video-lead',
    schema: ['article', 'faq']
  },

  'extract-key-points-from-youtube-video': {
    path: '/extract-key-points-from-youtube-video',
    file: 'extract-key-points-from-youtube-video.html',
    section: 'guides',
    title: 'Extract Key Points From a YouTube Video',
    description:
      'Extract the key points from any YouTube video, each anchored to a timestamp. How to tell a real takeaway from a topic label, and how to check one.',
    cardKicker: 'Key points',
    cardImage: 'extract-key-points-lead',
    schema: ['article', 'faq']
  },

  'youtube-video-to-notes': {
    path: '/youtube-video-to-notes',
    file: 'youtube-video-to-notes.html',
    section: 'guides',
    title: 'YouTube Video to Notes',
    description:
      'Turn a YouTube video into structured notes with clickable timestamps, exportable to Markdown. Where generated notes help, and where they do not.',
    cardKicker: 'Video to notes',
    cardImage: 'youtube-video-to-notes-lead',
    schema: ['article', 'faq']
  },

  'timestamped-youtube-summary': {
    path: '/timestamped-youtube-summary',
    file: 'timestamped-youtube-summary.html',
    section: 'guides',
    title: 'Timestamped YouTube Summary',
    description:
      'Get a timestamped YouTube summary where every claim links to the second it came from, and learn how to tell real timestamps from reconstructed ones.',
    cardKicker: 'Timestamps',
    cardImage: 'timestamped-youtube-summary-lead',
    schema: ['article', 'faq']
  },

  'youtube-shorts-summarizer': {
    path: '/youtube-shorts-summarizer',
    file: 'youtube-shorts-summarizer.html',
    section: 'guides',
    title: 'YouTube Shorts Summarizer',
    description:
      'Summarize YouTube Shorts and short clips. Shorts URLs work the same as any video here, though the honest answer is that most Shorts do not need summarizing.',
    cardKicker: 'Shorts',
    cardImage: 'youtube-shorts-summarizer-lead',
    schema: ['article', 'faq']
  },

  'youtube-livestream-summarizer': {
    path: '/youtube-livestream-summarizer',
    file: 'youtube-livestream-summarizer.html',
    section: 'guides',
    title: 'YouTube Livestream Summarizer',
    description:
      'Summarize a YouTube livestream replay without watching four hours of it. What streams do to captions, and how to check the whole replay was read.',
    cardKicker: 'Livestreams',
    cardImage: 'youtube-livestream-summarizer-lead',
    schema: ['article', 'faq']
  },

  'summarize-youtube-transcript': {
    path: '/summarize-youtube-transcript',
    file: 'summarize-youtube-transcript.html',
    section: 'guides',
    title: 'How to Summarize a YouTube Transcript',
    description:
      'How to summarize a YouTube transcript properly, whether by hand or automatically, and why pasting one into a chatbot loses the thing that made it useful.',
    cardKicker: 'Transcripts',
    cardImage: 'summarize-youtube-transcript-lead',
    schema: ['article', 'faq']
  },

  'summarize-youtube-video-without-transcript': {
    path: '/summarize-youtube-video-without-transcript',
    file: 'summarize-youtube-video-without-transcript.html',
    section: 'guides',
    title: 'How to Summarize a Video With No Transcript',
    description:
      'What to do when a YouTube video has no captions, why tools that summarize it anyway are guessing, and the workarounds that actually exist.',
    cardKicker: 'No captions',
    cardImage: 'summarize-without-transcript-lead',
    schema: ['article', 'faq']
  },

};

/** path → page, built once at import. */
export const BY_PATH = Object.fromEntries(
  Object.entries(PAGES).map(([slug, p]) => [p.path, { ...p, slug }])
);
