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
  },

  /* ---- Batch 02 - tutorials ---- */
  {
    id: 'youtube-tutorial-summarizer-lead',
    provider: 'pexels',
    query: 'person following a tutorial at a desk with laptop',
    alt: 'Someone working through a tutorial at a laptop.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'tutorial-numbered-steps',
    provider: 'unsplash',
    query: 'numbered list written on a notepad',
    alt: 'A numbered list written out on a notepad.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'tutorial-screen-content',
    provider: 'pexels',
    query: 'computer screen showing an application interface',
    alt: 'A computer screen showing an application interface.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'tutorial-follow-along',
    provider: 'unsplash',
    query: 'hands working on a laptop beside written notes',
    alt: 'Hands working at a laptop with notes alongside.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'tutorial-step-check',
    provider: 'pexels',
    query: 'hand ticking items off a checklist',
    alt: 'A hand ticking items off a printed checklist.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'tutorial-export-checklist',
    provider: 'unsplash',
    query: 'checklist on a clipboard on a desk',
    alt: 'A checklist on a clipboard resting on a desk.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - languages ---- */
  {
    id: 'multilingual-youtube-summarizer-lead',
    provider: 'pexels',
    query: 'world map with pins on a wall',
    alt: 'A world map with pins marking locations.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'multilingual-language-picker',
    provider: 'unsplash',
    query: 'dictionary open on a desk',
    alt: 'An open dictionary lying on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'multilingual-what-survives',
    provider: 'pexels',
    query: 'two books in different languages side by side',
    alt: 'Two books in different languages side by side.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'multilingual-double-translation',
    provider: 'unsplash',
    query: 'photocopy of a photocopy of text',
    alt: 'A degraded photocopy of a page of text.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'multilingual-timestamp-check',
    provider: 'pexels',
    query: 'finger pointing at a line of foreign text',
    alt: 'A finger resting on a line of printed text.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'multilingual-global-desk',
    provider: 'unsplash',
    query: 'desk with laptop and international newspapers',
    alt: 'A desk with a laptop and newspapers in several languages.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - one hour ---- */
  {
    id: 'summarize-1-hour-youtube-video-lead',
    provider: 'pexels',
    query: 'clock face showing an hour passing',
    alt: 'A clock face on a plain wall.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'one-hour-transcript-scale',
    provider: 'unsplash',
    query: 'thick stack of printed paper on a desk',
    alt: 'A thick stack of printed pages on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'one-hour-timestamp-shape',
    provider: 'pexels',
    query: 'ruler and measuring marks on paper',
    alt: 'A ruler laid across marked paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'one-hour-output-length',
    provider: 'unsplash',
    query: 'small note beside a large document',
    alt: 'A small note card beside a thick document.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'one-hour-eight-minutes',
    provider: 'pexels',
    query: 'hourglass beside a laptop',
    alt: 'An hourglass standing beside a laptop.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'one-hour-conference-room',
    provider: 'unsplash',
    query: 'empty conference room with projector screen',
    alt: 'An empty conference room with a projector screen.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - key points ---- */
  {
    id: 'extract-key-points-lead',
    provider: 'pexels',
    query: 'highlighted lines in a printed document',
    alt: 'Highlighted lines running down a printed document.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'extract-key-points-bullets',
    provider: 'unsplash',
    query: 'bullet point list on a whiteboard',
    alt: 'A short bullet list written on a whiteboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'extract-key-points-priority',
    provider: 'pexels',
    query: 'stones stacked in order of size',
    alt: 'Stones stacked in descending order of size.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'extract-key-points-lost-detail',
    provider: 'unsplash',
    query: 'torn paper with missing pieces',
    alt: 'A torn sheet of paper with pieces missing.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'extract-key-points-shared',
    provider: 'pexels',
    query: 'phone showing a message being shared',
    alt: 'A phone screen showing a message thread.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'extract-key-points-count',
    provider: 'unsplash',
    query: 'counting on an abacus',
    alt: 'Beads counted along an abacus.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - notes ---- */
  {
    id: 'youtube-video-to-notes-lead',
    provider: 'pexels',
    query: 'open notebook with structured notes and pen',
    alt: 'An open notebook of structured notes with a pen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'video-to-notes-two-kinds',
    provider: 'unsplash',
    query: 'typed page beside a handwritten page',
    alt: 'A typed page lying beside a handwritten one.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'video-to-notes-export',
    provider: 'pexels',
    query: 'laptop screen showing plain text notes',
    alt: 'Plain text notes open on a laptop screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'video-to-notes-workflow',
    provider: 'unsplash',
    query: 'two notebooks open side by side',
    alt: 'Two notebooks open side by side on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'video-to-notes-months-later',
    provider: 'pexels',
    query: 'old notebook reopened on a desk',
    alt: 'A worn notebook reopened on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'video-to-notes-archive',
    provider: 'unsplash',
    query: 'shelf of labelled notebooks',
    alt: 'A shelf holding rows of labelled notebooks.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - timestamped summaries ---- */
  {
    id: 'timestamped-youtube-summary-lead',
    provider: 'pexels',
    query: 'stopwatch resting on printed notes',
    alt: 'A stopwatch resting on a page of notes.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'timestamped-summary-jobs',
    provider: 'unsplash',
    query: 'signpost with three directions',
    alt: 'A signpost pointing in three directions.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'timestamped-summary-check',
    provider: 'pexels',
    query: 'magnifying glass over a line of text',
    alt: 'A magnifying glass over a line of printed text.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'timestamped-summary-chapters',
    provider: 'unsplash',
    query: 'tabbed dividers in a ring binder',
    alt: 'Tabbed dividers separating sections in a binder.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'timestamped-summary-limits',
    provider: 'pexels',
    query: 'single link in a metal chain',
    alt: 'A close-up of one link in a metal chain.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'timestamped-summary-export',
    provider: 'unsplash',
    query: 'text document open on a tablet',
    alt: 'A text document open on a tablet screen.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - shorts ---- */
  {
    id: 'youtube-shorts-summarizer-lead',
    provider: 'pexels',
    query: 'phone held vertically showing a video',
    alt: 'A phone held upright playing a video.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'shorts-phone-scrolling',
    provider: 'unsplash',
    query: 'thumb scrolling on a phone screen',
    alt: 'A thumb scrolling on a phone screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'shorts-captions',
    provider: 'pexels',
    query: 'phone screen with subtitles over video',
    alt: 'Subtitles overlaid on a phone video.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'shorts-clip-length',
    provider: 'unsplash',
    query: 'short film strip on a white surface',
    alt: 'A short strip of film on a white surface.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'shorts-batch-record',
    provider: 'pexels',
    query: 'grid of small photo prints on a table',
    alt: 'A grid of small photo prints laid on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'shorts-what-you-get',
    provider: 'unsplash',
    query: 'phone and notepad side by side on a desk',
    alt: 'A phone and a notepad side by side on a desk.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - livestreams ---- */
  {
    id: 'youtube-livestream-summarizer-lead',
    provider: 'pexels',
    query: 'live broadcast studio with camera',
    alt: 'A broadcast camera in a studio.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'livestream-length',
    provider: 'unsplash',
    query: 'long audio waveform on a monitor',
    alt: 'A long audio waveform across a monitor.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'livestream-coverage-check',
    provider: 'pexels',
    query: 'progress bar on a video player screen',
    alt: 'A video player progress bar on screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'livestream-segments',
    provider: 'unsplash',
    query: 'sectioned timeline drawn on paper',
    alt: 'A timeline divided into sections on paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'livestream-archive',
    provider: 'pexels',
    query: 'archive shelves of recorded media',
    alt: 'Shelves of archived recorded media.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'livestream-event',
    provider: 'unsplash',
    query: 'conference stage with large screen',
    alt: 'A conference stage with a large display screen.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - transcripts ---- */
  {
    id: 'summarize-youtube-transcript-lead',
    provider: 'pexels',
    query: 'printed transcript with handwritten marks',
    alt: 'A printed transcript marked up by hand.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'summarize-transcript-methods',
    provider: 'unsplash',
    query: 'three paths diverging in a field',
    alt: 'Three paths diverging across open ground.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summarize-transcript-raw',
    provider: 'pexels',
    query: 'unbroken block of printed text',
    alt: 'An unbroken block of printed text.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summarize-transcript-compression',
    provider: 'unsplash',
    query: 'large book beside a small card',
    alt: 'A large book next to a single small card.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summarize-transcript-why-stop',
    provider: 'pexels',
    query: 'conveyor belt with boxes in a warehouse',
    alt: 'Boxes moving along a warehouse conveyor.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summarize-transcript-quote',
    provider: 'unsplash',
    query: 'quotation marked in a printed page',
    alt: 'A quotation marked out on a printed page.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 02 - no transcript ---- */
  {
    id: 'summarize-without-transcript-lead',
    provider: 'pexels',
    query: 'muted speaker icon on a dark screen',
    alt: 'A dark screen showing a muted speaker symbol.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'no-transcript-causes',
    provider: 'unsplash',
    query: 'blank sheet of paper on a desk',
    alt: 'A blank sheet of paper on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'no-transcript-honest-failure',
    provider: 'pexels',
    query: 'closed sign in a shop window',
    alt: 'A closed sign hanging in a shop window.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'no-transcript-bad-captions',
    provider: 'unsplash',
    query: 'distorted text on a glitching screen',
    alt: 'Distorted text on a glitching display.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'no-transcript-visual-content',
    provider: 'pexels',
    query: 'silent film projector in a dark room',
    alt: 'A film projector running in a dark room.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'no-transcript-tool-test',
    provider: 'unsplash',
    query: 'laboratory test tubes in a rack',
    alt: 'Test tubes lined up in a rack.',
    width: 1240,
    aspect: '16/9'
  }
];

export const SLOTS_BY_ID = Object.fromEntries(IMAGE_SLOTS.map((s) => [s.id, s]));
