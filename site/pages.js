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

  'best-youtube-summarizer-for-students': {
    path: '/best-youtube-summarizer-for-students',
    file: 'best-youtube-summarizer-for-students.html',
    section: 'guides',
    title: 'Best YouTube Summarizer for Students',
    description:
      'What actually matters when picking a YouTube summarizer for lectures, how the main tools differ on published limits, and where each one falls short.',
    cardKicker: 'For students',
    cardImage: 'best-for-students-lead',
    schema: ['article', 'faq']
  },

  'best-youtube-summarizer-for-long-videos': {
    path: '/best-youtube-summarizer-for-long-videos',
    file: 'best-youtube-summarizer-for-long-videos.html',
    section: 'guides',
    title: 'Best YouTube Summarizer for Long Videos',
    description:
      'How the main YouTube summarizers handle two and three-hour videos, what each publishes about its limits, and the one test that exposes silent truncation.',
    cardKicker: 'Long videos',
    cardImage: 'best-for-long-videos-lead',
    schema: ['article', 'faq']
  },

  'best-youtube-summarizer-with-timestamps': {
    path: '/best-youtube-summarizer-with-timestamps',
    file: 'best-youtube-summarizer-with-timestamps.html',
    section: 'guides',
    title: 'Best YouTube Summarizer With Timestamps',
    description:
      'Which YouTube summarizers provide clickable timestamps, how to tell real ones from reconstructed ones, and why it matters more than any other feature.',
    cardKicker: 'Timestamps',
    cardImage: 'best-with-timestamps-lead',
    schema: ['article', 'faq']
  },

  'best-free-youtube-summarizer': {
    path: '/best-free-youtube-summarizer',
    file: 'best-free-youtube-summarizer.html',
    section: 'guides',
    title: 'Best Free YouTube Summarizer',
    description:
      'Which YouTube summarizers are genuinely free, what each free tier actually publishes, and the limits that only surface once you are depending on the tool.',
    cardKicker: 'Free tools',
    cardImage: 'best-free-lead',
    schema: ['article', 'faq']
  },

  'best-ai-youtube-summarizer': {
    path: '/best-ai-youtube-summarizer',
    file: 'best-ai-youtube-summarizer.html',
    section: 'guides',
    title: 'Best AI YouTube Summarizer',
    description:
      'What the AI in an AI YouTube summarizer actually does, why the model matters less than the pipeline around it, and how to judge output you cannot verify.',
    cardKicker: 'AI tools',
    cardImage: 'best-ai-summarizer-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-alternatives': {
    path: '/youtube-summarizer-alternatives',
    file: 'youtube-summarizer-alternatives.html',
    section: 'guides',
    title: 'YouTube Summarizer Alternatives',
    description:
      'A map of the YouTube summarizer landscape by category — extensions, research tools, study platforms and web apps — and which kind suits which job.',
    cardKicker: 'Alternatives',
    cardImage: 'summarizer-alternatives-lead',
    schema: ['article', 'faq']
  },

  'best-youtube-summarizer-without-signup': {
    path: '/best-youtube-summarizer-without-signup',
    file: 'best-youtube-summarizer-without-signup.html',
    section: 'guides',
    title: 'Best YouTube Summarizer Without Sign-Up',
    description:
      'Which YouTube summarizers work with no account, why most ask for one, and what you give up by staying anonymous. Published facts, checked and dated.',
    cardKicker: 'No sign-up',
    cardImage: 'best-without-signup-lead',
    schema: ['article', 'faq']
  },

  'best-youtube-summarizer-for-podcasts': {
    path: '/best-youtube-summarizer-for-podcasts',
    file: 'best-youtube-summarizer-for-podcasts.html',
    section: 'guides',
    title: 'Best YouTube Summarizer for Podcasts',
    description:
      'What matters when summarizing three-hour podcast episodes, how the main tools compare on published terms, and the failure that hits long-form hardest.',
    cardKicker: 'For podcasts',
    cardImage: 'best-for-podcasts-lead',
    schema: ['article', 'faq']
  },

  'best-youtube-summarizer-chrome-extension': {
    path: '/best-youtube-summarizer-chrome-extension',
    file: 'best-youtube-summarizer-chrome-extension.html',
    section: 'guides',
    title: 'Best YouTube Summarizer Chrome Extension',
    description:
      'We do not make a Chrome extension. Here is when an extension is the right choice, what to check before installing one, and when a web tool is better.',
    cardKicker: 'Extensions',
    cardImage: 'best-chrome-extension-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-vs-transcript-tools': {
    path: '/youtube-summarizer-vs-transcript-tools',
    file: 'youtube-summarizer-vs-transcript-tools.html',
    section: 'guides',
    title: 'YouTube Summarizer vs Transcript Tools',
    description:
      'Transcript tools and summarizers answer different questions. Which to reach for, what each category does well, and why many tools blur the line.',
    cardKicker: 'vs transcripts',
    cardImage: 'summarizer-vs-transcript-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-for-college-students': {
    path: '/youtube-summarizer-for-college-students',
    file: 'youtube-summarizer-for-college-students.html',
    section: 'guides',
    title: 'YouTube Summarizer for College Students',
    description:
      'How to use a YouTube summarizer for university work — recorded lectures, seminar prep, reading around a topic — and where it stops being useful.',
    cardKicker: 'College',
    cardImage: 'college-students-lead',
    schema: ['article', 'faq']
  },

  'how-to-summarize-a-youtube-video-for-studying': {
    path: '/how-to-summarize-a-youtube-video-for-studying',
    file: 'how-to-summarize-a-youtube-video-for-studying.html',
    section: 'guides',
    title: 'How to Summarize a YouTube Video for Studying',
    description:
      'The order matters more than the tool. How to summarize a video for studying without replacing the work that makes the material stick.',
    cardKicker: 'Studying',
    cardImage: 'summarize-for-studying-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-for-online-courses': {
    path: '/youtube-summarizer-for-online-courses',
    file: 'youtube-summarizer-for-online-courses.html',
    section: 'guides',
    title: 'YouTube Summarizer for Online Courses',
    description:
      'How to use a summarizer on MOOCs and course playlists — triaging modules, skipping what you know, and keeping a searchable record of a whole course.',
    cardKicker: 'Online courses',
    cardImage: 'online-courses-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-for-high-school-students': {
    path: '/youtube-summarizer-for-high-school-students',
    file: 'youtube-summarizer-for-high-school-students.html',
    section: 'guides',
    title: 'YouTube Summarizer for High School Students',
    description:
      'How a YouTube summarizer helps with homework and exam revision, where it becomes cheating, and why the summary is the wrong thing to revise from.',
    cardKicker: 'High school',
    cardImage: 'high-school-lead',
    schema: ['article', 'faq']
  },

  'youtube-auto-captions-accuracy': {
    path: '/youtube-auto-captions-accuracy',
    file: 'youtube-auto-captions-accuracy.html',
    section: 'guides',
    title: 'How Accurate Are YouTube Auto-Captions?',
    description:
      'What YouTube\'s automatic captions get wrong, why the errors are hard to spot, and what that means for anything built on top of them.',
    cardKicker: 'Captions',
    cardImage: 'auto-captions-lead',
    schema: ['article', 'faq']
  },

  'youtube-summary-not-working': {
    path: '/youtube-summary-not-working',
    file: 'youtube-summary-not-working.html',
    section: 'guides',
    title: 'YouTube Summary Not Working: What to Check',
    description:
      'Why a YouTube summary failed and what to do about it — missing captions, recent uploads, private videos, long runtimes and silent truncation.',
    cardKicker: 'Troubleshooting',
    cardImage: 'summary-not-working-lead',
    schema: ['article', 'faq']
  },

  'copy-youtube-transcript': {
    path: '/copy-youtube-transcript',
    file: 'copy-youtube-transcript.html',
    section: 'guides',
    title: 'How to Copy a YouTube Transcript',
    description:
      'How to copy a YouTube transcript in a few clicks, what you lose when you do, and when the raw text is genuinely the right thing to want.',
    cardKicker: 'Transcripts',
    cardImage: 'copy-transcript-lead',
    schema: ['article', 'faq']
  },

  'summarize-youtube-playlist': {
    path: '/summarize-youtube-playlist',
    file: 'summarize-youtube-playlist.html',
    section: 'guides',
    title: 'How to Summarize a YouTube Playlist',
    description:
      'Working through a playlist with a summarizer — triaging which videos to watch, building a searchable record, and what a daily limit means in practice.',
    cardKicker: 'Playlists',
    cardImage: 'summarize-playlist-lead',
    schema: ['article', 'faq']
  },

  'webinar-summarizer': {
    path: '/webinar-summarizer',
    file: 'webinar-summarizer.html',
    section: 'guides',
    title: 'Webinar Summarizer',
    description:
      'Turn a recorded webinar into the ten minutes that mattered — skipping the introductions and the pitch, and sharing the substance with people who missed it.',
    cardKicker: 'Webinars',
    cardImage: 'webinar-summarizer-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-for-research': {
    path: '/youtube-summarizer-for-research',
    file: 'youtube-summarizer-for-research.html',
    section: 'guides',
    title: 'YouTube Summarizer for Research',
    description:
      'Using a summarizer for conference talks and research video — triaging a playlist, citing the exact moment of a claim, and where it must not be trusted.',
    cardKicker: 'Research',
    cardImage: 'for-research-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-for-content-creators': {
    path: '/youtube-summarizer-for-content-creators',
    file: 'youtube-summarizer-for-content-creators.html',
    section: 'guides',
    title: 'YouTube Summarizer for Content Creators',
    description:
      'How creators use summaries for research, competitive analysis and repurposing their own back catalogue — and the one use that will get you in trouble.',
    cardKicker: 'For creators',
    cardImage: 'creators-lead',
    schema: ['article', 'faq']
  },

  'repurpose-youtube-video-into-blog-post': {
    path: '/repurpose-youtube-video-into-blog-post',
    file: 'repurpose-youtube-video-into-blog-post.html',
    section: 'guides',
    title: 'Repurpose a YouTube Video Into a Blog Post',
    description:
      'Turning a video into a written piece properly — why transcripts make terrible articles, and what to do with the chapter map instead.',
    cardKicker: 'Repurposing',
    cardImage: 'repurpose-lead',
    schema: ['article', 'faq']
  },

  'podcast-show-notes-generator': {
    path: '/podcast-show-notes-generator',
    file: 'podcast-show-notes-generator.html',
    section: 'guides',
    title: 'Podcast Show Notes Generator',
    description:
      'Turn an episode into show notes with timestamped chapters — what listeners actually use them for, and the parts that still need writing by hand.',
    cardKicker: 'Show notes',
    cardImage: 'show-notes-lead',
    schema: ['article', 'faq']
  },

  'competitor-video-research': {
    path: '/competitor-video-research',
    file: 'competitor-video-research.html',
    section: 'guides',
    title: 'Competitor Video Research With Summaries',
    description:
      'How to analyse a competitor\'s video output without watching forty hours of it — what patterns summaries reveal, and what they cannot tell you.',
    cardKicker: 'Competitors',
    cardImage: 'competitor-research-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-for-seo-research': {
    path: '/youtube-summarizer-for-seo-research',
    file: 'youtube-summarizer-for-seo-research.html',
    section: 'guides',
    title: 'YouTube Summarizer for SEO Content Research',
    description:
      'Using video summaries for content research — finding what ranking pages miss, harvesting real questions, and why video is an underused research source.',
    cardKicker: 'SEO research',
    cardImage: 'seo-research-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-for-teams': {
    path: '/youtube-summarizer-for-teams',
    file: 'youtube-summarizer-for-teams.html',
    section: 'guides',
    title: 'YouTube Summarizer for Teams',
    description:
      'One person watches, everyone reads. How teams use video summaries for recorded meetings, training and industry talks — and what to agree before you start.',
    cardKicker: 'For teams',
    cardImage: 'for-teams-lead',
    schema: ['article', 'faq']
  },

  'export-youtube-summary-markdown': {
    path: '/export-youtube-summary-markdown',
    file: 'export-youtube-summary-markdown.html',
    section: 'guides',
    title: 'Export a YouTube Summary to Markdown',
    description:
      'Why export matters more than it sounds, what survives the move into Notion or Obsidian, and the one thing that quietly breaks if you copy by hand.',
    cardKicker: 'Export',
    cardImage: 'export-markdown-lead',
    schema: ['article', 'faq']
  },

  'summarize-youtube-video-with-chatgpt': {
    path: '/summarize-youtube-video-with-chatgpt',
    file: 'summarize-youtube-video-with-chatgpt.html',
    section: 'guides',
    title: 'Summarizing YouTube Videos With ChatGPT: The Limits',
    description:
      'How to summarize a YouTube video with ChatGPT, what goes wrong with long transcripts, and the thing you lose that nobody mentions.',
    cardKicker: 'vs ChatGPT',
    cardImage: 'chatgpt-limits-lead',
    schema: ['article', 'faq']
  },

  'summarize-youtube-video-on-mobile': {
    path: '/summarize-youtube-video-on-mobile',
    file: 'summarize-youtube-video-on-mobile.html',
    section: 'guides',
    title: 'How to Summarize a YouTube Video on Mobile',
    description:
      'Summarizing videos on a phone — sharing a link from the YouTube app, why transcripts are awkward on mobile, and what works without installing anything.',
    cardKicker: 'On mobile',
    cardImage: 'mobile-lead',
    schema: ['article', 'faq']
  },

  'youtube-summarizer-privacy': {
    path: '/youtube-summarizer-privacy',
    file: 'youtube-summarizer-privacy.html',
    section: 'guides',
    title: 'Is It Safe to Use a YouTube Summarizer?',
    description:
      'What a YouTube summarizer can see, what browser extensions ask for, and the questions worth asking before putting work material through any of them.',
    cardKicker: 'Privacy',
    cardImage: 'privacy-lead',
    schema: ['article', 'faq']
  },

};

/** path → page, built once at import. */
export const BY_PATH = Object.fromEntries(
  Object.entries(PAGES).map(([slug, p]) => [p.path, { ...p, slug }])
);
