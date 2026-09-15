/**
 * Every photo the site uses, and what it is for.
 *
 * This is the request side: an id, a search query, and the alt text a screen
 * reader will actually read. `tools/fetch-images.mjs` resolves each slot
 * against Unsplash or Pexels once, downloads the file into public/assets/img/,
 * and records what it picked in site/image-manifest.json — the answer side.
 *
 * Editing a query here does nothing on its own. Re-run `npm run images` to
 * resolve it, or `npm run images -- --refresh <id>` to re-pick one slot.
 *
 * `alt` is written by hand on purpose. The providers' own descriptions describe
 * the photograph ("woman sitting at desk"); alt text should say why the image
 * is on *this* page. Decorative-only images would take alt: '' instead.
 *
 * `provider` is a preference, not a requirement. If that provider's keys are
 * all spent the fetcher falls back to the other one, so a build never stalls
 * on a quota.
 */

export const IMAGE_SLOTS = [
  /* ---- Use cases ---- */
  {
    id: 'use-cases-students',
    provider: 'unsplash',
    query: 'student studying notes laptop desk',
    alt: 'A student working through handwritten notes beside an open laptop.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'use-cases-researchers',
    provider: 'unsplash',
    query: 'researcher reading academic papers library',
    alt: 'Stacked journal papers and a laptop on a library desk.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'use-cases-creators',
    provider: 'pexels',
    query: 'video creator editing desk microphone',
    alt: 'A creator’s desk set up for recording, with a microphone and editing timeline on screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'use-cases-teams',
    provider: 'pexels',
    query: 'small team meeting laptops discussion office',
    alt: 'A small team around a table, laptops open, mid-discussion.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },

  /* ---- Blog ---- */
  {
    id: 'blog-how-to-study',
    provider: 'unsplash',
    query: 'studying revision notebook flashcards',
    alt: 'Revision notes and flashcards spread across a desk.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'blog-timestamps',
    provider: 'pexels',
    query: 'stopwatch clock time close up',
    alt: 'A stopwatch held against a plain background.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'blog-transcripts',
    provider: 'unsplash',
    query: 'printed text pages close up typography',
    alt: 'Close-up of dense printed text running down a page.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },

  /* ---- Company ---- */
  {
    id: 'about-hero',
    provider: 'pexels',
    query: 'person watching lecture video laptop headphones',
    alt: 'Someone watching a recorded talk on a laptop, wearing headphones.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },

  /* ---- Blog: how to study ----
     In-article photos, one per section. No `eager` flag: only each page's lead
     photo is worth preloading, the rest are below the fold. Slightly narrower
     than a lead image because they render in the same 820px column. */
  {
    id: 'blog-study-fluency',
    provider: 'unsplash',
    query: 'student watching video tutorial screen evening',
    alt: 'A student watching a recorded tutorial, lit only by the screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-study-rewatch',
    provider: 'pexels',
    query: 'alarm clock desk lamp late night study',
    alt: 'A clock on a desk beside a lamp, late in the evening.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-study-retrieval',
    provider: 'unsplash',
    query: 'handwriting in an open blank notebook pen',
    alt: 'A hand writing on the first blank page of a notebook.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-study-spacing',
    provider: 'pexels',
    query: 'weekly planner calendar desk schedule',
    alt: 'A weekly planner open on a desk, days blocked out.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-study-gaps',
    provider: 'unsplash',
    query: 'highlighted textbook margin notes annotation',
    alt: 'A textbook page marked up with highlighter and margin notes.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Blog: timestamps ---- */
  {
    id: 'blog-ts-hedge',
    provider: 'pexels',
    query: 'conference speaker presenting to audience microphone',
    alt: 'A speaker mid-sentence in front of a conference audience.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-ts-compression',
    provider: 'unsplash',
    query: 'stacked archive boxes documents storage',
    alt: 'Archive boxes stacked in storage.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-ts-fluency',
    provider: 'pexels',
    query: 'open book clean typography page spread',
    alt: 'An open book showing two pages of clean, even typesetting.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-ts-pipeline',
    provider: 'unsplash',
    query: 'audio editing software waveform timeline screen',
    alt: 'An audio waveform laid out along an editing timeline.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-ts-test',
    provider: 'pexels',
    query: 'magnifying glass over printed document detail',
    alt: 'A magnifying glass held over a line of printed text.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Blog: transcripts ---- */
  {
    id: 'blog-tr-speech',
    provider: 'unsplash',
    query: 'podcast microphone recording studio speaking',
    alt: 'A studio microphone set up for recording speech.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-tr-wall',
    provider: 'pexels',
    query: 'stack of printed paper documents dense text',
    alt: 'A tall stack of densely printed pages.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-tr-structure',
    provider: 'unsplash',
    query: 'outline diagram sketched in notebook planning',
    alt: 'A structure sketched out as a branching diagram in a notebook.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-tr-claims',
    provider: 'pexels',
    query: 'sticky notes organised on a wall sorting',
    alt: 'Sticky notes grouped into columns on a wall.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'blog-tr-tests',
    provider: 'unsplash',
    query: 'checklist clipboard pen ticking boxes',
    alt: 'A checklist on a clipboard with boxes being ticked off.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - free / no sign-up ---- */
  {
    id: 'free-youtube-summarizer-no-signup-lead',
    provider: 'unsplash',
    query: 'laptop open on a desk with browser window',
    alt: 'A laptop open at a browser window on a plain desk.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'free-summarizer-signup-wall',
    provider: 'pexels',
    query: 'closed sign hanging on a glass door',
    alt: 'A closed sign hanging inside a glass door.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'free-summarizer-why-accounts',
    provider: 'unsplash',
    query: 'server racks in a data centre',
    alt: 'Rows of server racks in a data centre.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'free-summarizer-missing-captions',
    provider: 'pexels',
    query: 'blank television screen static',
    alt: 'A screen showing nothing but static.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'free-summarizer-quick-test',
    provider: 'unsplash',
    query: 'stopwatch on a desk beside a laptop',
    alt: 'A stopwatch resting on a desk next to a laptop.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'free-summarizer-account-value',
    provider: 'pexels',
    query: 'person filling in a form on a laptop',
    alt: 'Someone filling in a sign-up form on a laptop.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - timestamps ---- */
  {
    id: 'youtube-summarizer-with-timestamps-lead',
    provider: 'unsplash',
    query: 'video editing timeline on a screen',
    alt: 'A video editing timeline stretched across a screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'timestamps-clickable-chapters',
    provider: 'pexels',
    query: 'video player progress bar close up',
    alt: 'Close-up of a video player\'s progress bar.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'timestamps-pipeline-cost',
    provider: 'unsplash',
    query: 'tangled cables and wires',
    alt: 'A dense tangle of cables.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'timestamps-verification-test',
    provider: 'pexels',
    query: 'magnifying glass over a computer screen',
    alt: 'A magnifying glass held over a screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'timestamps-chapters-vs-markers',
    provider: 'unsplash',
    query: 'coloured bookmarks in book pages',
    alt: 'Coloured tabs marking pages in a book.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'timestamps-markdown-export',
    provider: 'pexels',
    query: 'plain text editor on a laptop screen',
    alt: 'A plain text editor open on a laptop.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - transcripts ---- */
  {
    id: 'youtube-transcript-summarizer-lead',
    provider: 'unsplash',
    query: 'printed transcript pages on a desk',
    alt: 'Printed transcript pages spread across a desk.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'transcript-wall-of-text',
    provider: 'pexels',
    query: 'dense printed text page close up',
    alt: 'A page of dense, unbroken printed text.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'transcript-auto-captions',
    provider: 'unsplash',
    query: 'subtitles displayed on a television screen',
    alt: 'Subtitles running along the bottom of a screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'transcript-four-steps',
    provider: 'pexels',
    query: 'concrete staircase steps',
    alt: 'A flight of plain concrete steps.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'transcript-why-tools-stop',
    provider: 'unsplash',
    query: 'factory conveyor belt',
    alt: 'An empty conveyor belt running through a factory.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'transcript-when-to-use',
    provider: 'pexels',
    query: 'person highlighting a printed document',
    alt: 'Someone marking a line in a printed document.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - long videos ---- */
  {
    id: 'long-youtube-video-summarizer-lead',
    provider: 'unsplash',
    query: 'long winding road seen from above',
    alt: 'A long road winding into the distance.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'long-video-missing-middle',
    provider: 'pexels',
    query: 'broken bridge with a gap',
    alt: 'A bridge with a section missing from the middle.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'long-video-timestamp-spread',
    provider: 'unsplash',
    query: 'measuring tape stretched out',
    alt: 'A measuring tape stretched across a surface.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'long-video-chunked-passes',
    provider: 'pexels',
    query: 'layered rock strata cliff',
    alt: 'Layered bands of rock in a cliff face.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'long-video-worth-it',
    provider: 'unsplash',
    query: 'hourglass with sand running',
    alt: 'An hourglass with the sand part run through.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'long-video-conference-talk',
    provider: 'pexels',
    query: 'conference auditorium with speaker on stage',
    alt: 'A speaker on stage in front of a full auditorium.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - key points ---- */
  {
    id: 'youtube-key-points-generator-lead',
    provider: 'unsplash',
    query: 'bulleted list written in a notebook',
    alt: 'A short bulleted list written in a notebook.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'key-points-bullets',
    provider: 'pexels',
    query: 'sticky notes arranged on a wall',
    alt: 'Sticky notes lined up in a column on a wall.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'key-points-priority-order',
    provider: 'unsplash',
    query: 'wooden blocks stacked in order',
    alt: 'Numbered wooden blocks arranged in order.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'key-points-timestamp-check',
    provider: 'pexels',
    query: 'finger pointing at a laptop screen',
    alt: 'A finger pointing at a line on a laptop screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'key-points-how-many',
    provider: 'unsplash',
    query: 'tally marks chalked on a board',
    alt: 'Tally marks chalked onto a board.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'key-points-four-depths',
    provider: 'pexels',
    query: 'nested boxes of different sizes',
    alt: 'Boxes of decreasing size nested inside each other.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - notes ---- */
  {
    id: 'youtube-notes-generator-lead',
    provider: 'unsplash',
    query: 'structured handwritten notes on a desk',
    alt: 'Neatly structured handwritten notes on a desk.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'notes-generated-vs-handwritten',
    provider: 'pexels',
    query: 'notebook beside an open laptop',
    alt: 'A handwritten notebook open beside a laptop.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'notes-compare-workflow',
    provider: 'unsplash',
    query: 'two documents side by side on a desk',
    alt: 'Two documents laid side by side for comparison.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'notes-markdown-export',
    provider: 'pexels',
    query: 'code editor with plain text on screen',
    alt: 'Plain text open in an editor on screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'notes-video-formats',
    provider: 'unsplash',
    query: 'film clapperboard on a table',
    alt: 'A clapperboard resting on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'notes-study-desk',
    provider: 'pexels',
    query: 'study desk with books and a lamp',
    alt: 'A study desk with stacked books and a lamp.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - comparisons ---- */
  {
    id: 'best-youtube-summarizer-lead',
    provider: 'unsplash',
    query: 'comparison checklist on a clipboard',
    alt: 'A checklist held on a clipboard.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'best-summarizer-listicles',
    provider: 'pexels',
    query: 'stack of magazines on a table',
    alt: 'A stack of magazines piled on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-summarizer-test-bench',
    provider: 'unsplash',
    query: 'laboratory testing equipment on a bench',
    alt: 'Testing equipment laid out on a laboratory bench.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-summarizer-red-flags',
    provider: 'pexels',
    query: 'red flag against a plain sky',
    alt: 'A single red flag against an open sky.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-summarizer-reliability',
    provider: 'unsplash',
    query: 'broken chain link close up',
    alt: 'A chain with one link broken open.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-summarizer-honest-limits',
    provider: 'pexels',
    query: 'wooden signpost pointing two ways',
    alt: 'A wooden signpost pointing in two directions.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - how to ---- */
  {
    id: 'how-to-summarize-a-youtube-video-lead',
    provider: 'unsplash',
    query: 'hands typing on a laptop keyboard',
    alt: 'Hands typing on a laptop keyboard.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'how-to-paste-link',
    provider: 'pexels',
    query: 'close up of a keyboard key',
    alt: 'A close-up of keys on a keyboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'how-to-methods-compared',
    provider: 'unsplash',
    query: 'path splitting into two directions',
    alt: 'A path forking into two directions.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'how-to-no-captions',
    provider: 'pexels',
    query: 'old film reel on a table',
    alt: 'An old film reel lying on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'how-to-pick-depth',
    provider: 'unsplash',
    query: 'stack of paper sheets from the side',
    alt: 'A stack of paper sheets seen edge-on.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'how-to-gap-list',
    provider: 'pexels',
    query: 'checklist notebook with blank lines',
    alt: 'A checklist in a notebook with lines left blank.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - podcasts ---- */
  {
    id: 'youtube-podcast-summarizer-lead',
    provider: 'unsplash',
    query: 'podcast studio with two microphones',
    alt: 'A podcast studio set up with two microphones.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'podcast-two-speakers',
    provider: 'pexels',
    query: 'two people talking across a table',
    alt: 'Two people talking across a table with microphones.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'podcast-long-runtime',
    provider: 'unsplash',
    query: 'audio waveform across a long timeline',
    alt: 'An audio waveform running the length of a timeline.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'podcast-topic-map',
    provider: 'pexels',
    query: 'mind map sketched in a notebook',
    alt: 'A branching mind map sketched in a notebook.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'podcast-what-next',
    provider: 'unsplash',
    query: 'headphones resting on a desk',
    alt: 'A pair of headphones resting on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'podcast-show-notes',
    provider: 'pexels',
    query: 'notebook beside a studio microphone',
    alt: 'An open notebook beside a studio microphone.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 01 - lectures ---- */
  {
    id: 'lecture-video-summarizer-lead',
    provider: 'unsplash',
    query: 'empty university lecture hall seats',
    alt: 'Empty seats in a university lecture hall.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'lecture-revision-table',
    provider: 'pexels',
    query: 'student revision notes spread on a desk',
    alt: 'Revision notes spread across a student\'s desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'lecture-gap-list',
    provider: 'unsplash',
    query: 'notebook page with blank spaces',
    alt: 'A notebook page with gaps left between the notes.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'lecture-chapter-map',
    provider: 'pexels',
    query: 'outline diagram drawn on paper',
    alt: 'An outline diagram drawn out on paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'lecture-term-archive',
    provider: 'unsplash',
    query: 'archive folders on shelves',
    alt: 'Rows of archive folders on a shelf.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'lecture-whiteboard-limits',
    provider: 'pexels',
    query: 'whiteboard covered in equations',
    alt: 'A whiteboard covered in handwritten equations.',
    width: 1240,
    aspect: '16/9'
  }
];

export const SLOTS_BY_ID = Object.fromEntries(IMAGE_SLOTS.map((s) => [s.id, s]));
