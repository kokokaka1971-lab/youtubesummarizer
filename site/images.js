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
  },

  /* ---- Batch 03 - comparisons ---- */
  {
    id: 'best-for-students-lead',
    provider: 'unsplash',
    query: 'student studying at a desk with laptop and books',
    alt: 'A student working at a desk covered in books and a laptop.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'best-for-students-table',
    provider: 'pexels',
    query: 'comparison chart printed on paper',
    alt: 'A printed comparison chart on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-students-flashcards',
    provider: 'unsplash',
    query: 'stack of revision flashcards on a table',
    alt: 'A stack of handwritten revision cards.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-students-revision',
    provider: 'pexels',
    query: 'student revising with highlighted notes',
    alt: 'Highlighted revision notes spread out for study.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-students-lecture-test',
    provider: 'unsplash',
    query: 'empty lecture theatre seats',
    alt: 'Rows of empty seats in a lecture theatre.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-students-limits',
    provider: 'pexels',
    query: 'wooden signpost with two arrows',
    alt: 'A wooden signpost pointing two ways.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-long-videos-lead',
    provider: 'unsplash',
    query: 'long straight road disappearing into distance',
    alt: 'A long road running to the horizon.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'best-for-long-videos-table',
    provider: 'pexels',
    query: 'spreadsheet of figures on a screen',
    alt: 'A table of figures displayed on screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-long-videos-check',
    provider: 'unsplash',
    query: 'stopwatch held in a hand',
    alt: 'A stopwatch held up in one hand.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-long-videos-output-length',
    provider: 'pexels',
    query: 'small card beside a thick book',
    alt: 'A small index card next to a thick book.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-long-videos-candidates',
    provider: 'unsplash',
    query: 'sorting papers into two piles',
    alt: 'Papers being sorted into two piles on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-long-videos-limits',
    provider: 'pexels',
    query: 'brick wall with a single gap',
    alt: 'A brick wall with one gap in it.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-with-timestamps-lead',
    provider: 'unsplash',
    query: 'clock face beside a laptop on a desk',
    alt: 'A clock face standing beside a laptop.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'best-with-timestamps-table',
    provider: 'pexels',
    query: 'printed table of data on a desk',
    alt: 'A printed data table lying on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-with-timestamps-test',
    provider: 'unsplash',
    query: 'finger pressing a button',
    alt: 'A finger pressing a single button.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-with-timestamps-export',
    provider: 'pexels',
    query: 'document open on a tablet screen',
    alt: 'A text document open on a tablet.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-with-timestamps-chapters',
    provider: 'unsplash',
    query: 'coloured index tabs in a folder',
    alt: 'Coloured index tabs separating pages in a folder.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-with-timestamps-limits',
    provider: 'pexels',
    query: 'measuring tape close up',
    alt: 'A measuring tape extended across a surface.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-free-lead',
    provider: 'unsplash',
    query: 'free sign hanging in a window',
    alt: 'A hand-lettered sign hanging in a window.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'best-free-limit-shapes',
    provider: 'pexels',
    query: 'four wooden blocks in a row',
    alt: 'Four wooden blocks lined up in a row.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-free-hidden-limits',
    provider: 'unsplash',
    query: 'iceberg above and below water',
    alt: 'An iceberg with most of its mass below the waterline.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-free-good-tier',
    provider: 'pexels',
    query: 'hand ticking a checklist',
    alt: 'A hand ticking items on a checklist.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-free-tool-longevity',
    provider: 'unsplash',
    query: 'closed shop shutter',
    alt: 'A closed metal shutter on a shopfront.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-free-our-limits',
    provider: 'pexels',
    query: 'number five chalked on a board',
    alt: 'The number five chalked onto a board.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-ai-summarizer-lead',
    provider: 'unsplash',
    query: 'circuit board close up',
    alt: 'A close-up of a circuit board.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'best-ai-pipeline',
    provider: 'pexels',
    query: 'factory production line machinery',
    alt: 'Machinery along a production line.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-ai-models',
    provider: 'unsplash',
    query: 'row of identical light bulbs',
    alt: 'A row of identical light bulbs.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-ai-tests',
    provider: 'pexels',
    query: 'laboratory beakers on a bench',
    alt: 'Beakers lined up on a laboratory bench.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-ai-marketing',
    provider: 'unsplash',
    query: 'neon sign glowing at night',
    alt: 'A glowing neon sign at night.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-ai-plumbing',
    provider: 'pexels',
    query: 'copper pipes and valves',
    alt: 'Copper pipework with valves.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summarizer-alternatives-lead',
    provider: 'unsplash',
    query: 'several doors in a corridor',
    alt: 'A corridor lined with several doors.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'alternatives-categories',
    provider: 'pexels',
    query: 'four sorted groups of objects on a table',
    alt: 'Objects sorted into four groups on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'alternatives-research',
    provider: 'unsplash',
    query: 'desk covered in open books and papers',
    alt: 'A desk covered with open books and papers.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'alternatives-paste-link',
    provider: 'pexels',
    query: 'keyboard close up with hands typing',
    alt: 'Hands typing on a keyboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'alternatives-switching',
    provider: 'unsplash',
    query: 'railway points switching tracks',
    alt: 'Railway points where two tracks diverge.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'alternatives-choosing',
    provider: 'pexels',
    query: 'person choosing between two paths',
    alt: 'A walker at a fork in a path.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-without-signup-lead',
    provider: 'unsplash',
    query: 'open door with no lock',
    alt: 'An open door standing ajar.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'without-signup-table',
    provider: 'pexels',
    query: 'clipboard with a form on a desk',
    alt: 'A blank form on a clipboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'without-signup-tradeoffs',
    provider: 'unsplash',
    query: 'balance scales on a table',
    alt: 'A set of balance scales on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'without-signup-when-to-register',
    provider: 'pexels',
    query: 'key resting on a wooden table',
    alt: 'A single key resting on a wooden table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'without-signup-anonymous-limits',
    provider: 'unsplash',
    query: 'turnstile at an entrance',
    alt: 'A metal turnstile at an entrance.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'without-signup-our-limits',
    provider: 'pexels',
    query: 'hand holding up five fingers',
    alt: 'A hand held up showing five fingers.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-podcasts-lead',
    provider: 'unsplash',
    query: 'podcast microphone in a studio',
    alt: 'A microphone set up in a recording studio.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'best-for-podcasts-table',
    provider: 'pexels',
    query: 'audio mixing desk faders',
    alt: 'Faders on an audio mixing desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-podcasts-attribution',
    provider: 'unsplash',
    query: 'two microphones facing each other',
    alt: 'Two microphones facing one another across a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-podcasts-map',
    provider: 'pexels',
    query: 'hand drawn timeline on paper',
    alt: 'A timeline sketched out on paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-podcasts-audio',
    provider: 'unsplash',
    query: 'headphones on a mixing desk',
    alt: 'Headphones resting on a mixing desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-for-podcasts-limits',
    provider: 'pexels',
    query: 'closed notebook beside a microphone',
    alt: 'A closed notebook beside a microphone.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'best-chrome-extension-lead',
    provider: 'unsplash',
    query: 'browser window open on a laptop',
    alt: 'A browser window open on a laptop screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'chrome-extension-vs-web',
    provider: 'pexels',
    query: 'two laptops side by side on a desk',
    alt: 'Two laptops open side by side.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chrome-extension-tests',
    provider: 'unsplash',
    query: 'magnifying glass over a keyboard',
    alt: 'A magnifying glass held above a keyboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chrome-extension-decision',
    provider: 'pexels',
    query: 'hand hovering over a light switch',
    alt: 'A hand reaching for a light switch.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chrome-extension-permissions',
    provider: 'unsplash',
    query: 'padlock on a metal gate',
    alt: 'A padlock securing a metal gate.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chrome-extension-browser',
    provider: 'pexels',
    query: 'laptop screen showing a web page',
    alt: 'A web page open on a laptop screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summarizer-vs-transcript-lead',
    provider: 'unsplash',
    query: 'thick document beside a short note',
    alt: 'A thick document lying beside a short note.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'vs-transcript-comparison',
    provider: 'pexels',
    query: 'two columns of printed text',
    alt: 'Two columns of printed text side by side.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'vs-transcript-which-when',
    provider: 'unsplash',
    query: 'toolbox with assorted tools',
    alt: 'An open toolbox with assorted tools.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'vs-transcript-research',
    provider: 'pexels',
    query: 'library reading room desks',
    alt: 'Desks in a library reading room.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'vs-transcript-workflow',
    provider: 'unsplash',
    query: 'numbered steps drawn on a whiteboard',
    alt: 'Numbered steps drawn on a whiteboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'vs-transcript-hybrid',
    provider: 'pexels',
    query: 'two mismatched puzzle pieces',
    alt: 'Two puzzle pieces that do not fit together.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 04 - students, courses, troubleshooting ---- */
  {
    id: 'college-students-lead',
    provider: 'pexels',
    query: 'university campus building exterior',
    alt: 'A university building seen from the campus lawn.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'college-students-week',
    provider: 'unsplash',
    query: 'weekly timetable on a wall planner',
    alt: 'A weekly timetable pinned to a wall.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'college-students-vocabulary',
    provider: 'pexels',
    query: 'academic textbook open at a glossary',
    alt: 'An academic textbook open at a page of definitions.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'college-students-reading',
    provider: 'unsplash',
    query: 'stack of academic papers on a desk',
    alt: 'A stack of printed academic papers.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'college-students-routine',
    provider: 'pexels',
    query: 'student working at a library desk',
    alt: 'A student working alone at a library desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'college-students-cost',
    provider: 'unsplash',
    query: 'coins and notes on a plain surface',
    alt: 'Loose coins and notes on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summarize-for-studying-lead',
    provider: 'pexels',
    query: 'blank notebook page with a pen',
    alt: 'An open notebook at a blank page with a pen resting on it.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'studying-order',
    provider: 'unsplash',
    query: 'numbered steps painted on stairs',
    alt: 'Numbers painted on a flight of steps.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'studying-gap-list',
    provider: 'pexels',
    query: 'list with items crossed out',
    alt: 'A handwritten list with several items crossed out.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'studying-spacing',
    provider: 'unsplash',
    query: 'calendar with dates circled',
    alt: 'A wall calendar with dates circled in pen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'studying-retrieval',
    provider: 'pexels',
    query: 'person thinking with eyes closed',
    alt: 'Someone pausing to think, eyes closed.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'studying-limits',
    provider: 'unsplash',
    query: 'chalkboard covered in equations',
    alt: 'A chalkboard filled with handwritten equations.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'online-courses-lead',
    provider: 'pexels',
    query: 'laptop showing an online course interface',
    alt: 'A laptop open at an online learning interface.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'online-courses-mapping',
    provider: 'unsplash',
    query: 'route map drawn on paper',
    alt: 'A route sketched out on paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'online-courses-index',
    provider: 'pexels',
    query: 'card index drawer open',
    alt: 'An open card index drawer.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'online-courses-routine',
    provider: 'unsplash',
    query: 'desk with laptop and notebook side by side',
    alt: 'A laptop and notebook side by side on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'online-courses-completion',
    provider: 'pexels',
    query: 'half finished jigsaw puzzle',
    alt: 'A jigsaw puzzle left half finished.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'online-courses-playlist',
    provider: 'unsplash',
    query: 'row of numbered folders on a shelf',
    alt: 'Numbered folders lined up on a shelf.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'high-school-lead',
    provider: 'pexels',
    query: 'school desk with exercise books',
    alt: 'A school desk with exercise books stacked on it.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'high-school-uses',
    provider: 'unsplash',
    query: 'highlighter pens beside notes',
    alt: 'Highlighter pens lying beside handwritten notes.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'high-school-revision',
    provider: 'pexels',
    query: 'revision timetable on a wall',
    alt: 'A revision timetable stuck to a wall.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'high-school-own-words',
    provider: 'unsplash',
    query: 'handwriting in a school exercise book',
    alt: 'A hand writing in a school exercise book.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'high-school-limits',
    provider: 'pexels',
    query: 'maths working on a whiteboard',
    alt: 'Mathematical working written on a whiteboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'high-school-free',
    provider: 'unsplash',
    query: 'empty wallet on a table',
    alt: 'An open, empty wallet on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'auto-captions-lead',
    provider: 'pexels',
    query: 'closed captions symbol on a screen',
    alt: 'A closed-captions symbol displayed on a screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'auto-captions-errors',
    provider: 'unsplash',
    query: 'misprinted text on a page',
    alt: 'A page of text with a visible printing error.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'auto-captions-structure',
    provider: 'pexels',
    query: 'punctuation marks printed large',
    alt: 'Large printed punctuation marks.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'auto-captions-improving',
    provider: 'unsplash',
    query: 'sound waveform on a monitor',
    alt: 'A sound waveform displayed on a monitor.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'auto-captions-check',
    provider: 'pexels',
    query: 'magnifying glass over printed text',
    alt: 'A magnifying glass over a line of printed text.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'auto-captions-none',
    provider: 'unsplash',
    query: 'blank screen in a dark room',
    alt: 'A blank screen glowing in a dark room.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summary-not-working-lead',
    provider: 'pexels',
    query: 'error message on a computer screen',
    alt: 'An error message displayed on a screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'not-working-causes',
    provider: 'unsplash',
    query: 'flowchart drawn on paper',
    alt: 'A flowchart sketched out on paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'not-working-restricted',
    provider: 'pexels',
    query: 'padlock on a chain link fence',
    alt: 'A padlock fastened to a chain link fence.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'not-working-thin',
    provider: 'unsplash',
    query: 'almost empty glass jar',
    alt: 'An almost empty glass jar on a shelf.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'not-working-changed',
    provider: 'pexels',
    query: 'road closed sign',
    alt: 'A road closed sign standing in a street.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'not-working-checklist',
    provider: 'unsplash',
    query: 'clipboard checklist with ticks',
    alt: 'A checklist on a clipboard with ticks against it.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'copy-transcript-lead',
    provider: 'pexels',
    query: 'text selected on a computer screen',
    alt: 'A block of text highlighted on a screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'copy-transcript-steps',
    provider: 'unsplash',
    query: 'hand using a computer mouse',
    alt: 'A hand resting on a computer mouse.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'copy-transcript-scale',
    provider: 'pexels',
    query: 'very long printed receipt',
    alt: 'A long printed receipt unrolled across a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'copy-transcript-paste',
    provider: 'unsplash',
    query: 'keyboard with hands typing quickly',
    alt: 'Hands typing quickly on a keyboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'copy-transcript-reuse',
    provider: 'pexels',
    query: 'copyright symbol on printed page',
    alt: 'A copyright notice printed on a page.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'copy-transcript-missing',
    provider: 'unsplash',
    query: 'empty picture frame on a wall',
    alt: 'An empty picture frame hanging on a wall.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'summarize-playlist-lead',
    provider: 'pexels',
    query: 'row of video thumbnails on a screen',
    alt: 'A grid of video thumbnails on a screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'playlist-two-kinds',
    provider: 'unsplash',
    query: 'two separate stacks of books',
    alt: 'Two separate stacks of books on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'playlist-course',
    provider: 'pexels',
    query: 'numbered tabs in a binder',
    alt: 'Numbered dividers inside a ring binder.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'playlist-export',
    provider: 'unsplash',
    query: 'files organised in a folder',
    alt: 'Paper files organised inside a folder.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'playlist-mixed-quality',
    provider: 'pexels',
    query: 'mixed pile of old photographs',
    alt: 'A mixed pile of old photographs.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'playlist-limits',
    provider: 'unsplash',
    query: 'overflowing inbox tray',
    alt: 'An overflowing paper inbox tray.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'webinar-summarizer-lead',
    provider: 'pexels',
    query: 'laptop showing a video call grid',
    alt: 'A laptop displaying a grid of video call participants.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'webinar-segments',
    provider: 'unsplash',
    query: 'pie chart drawn on paper',
    alt: 'A pie chart sketched on paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'webinar-sharing',
    provider: 'pexels',
    query: 'colleagues looking at a laptop together',
    alt: 'Two colleagues looking at a laptop together.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'webinar-coverage',
    provider: 'unsplash',
    query: 'measuring jug with marked levels',
    alt: 'A measuring jug showing marked levels.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'webinar-panel',
    provider: 'pexels',
    query: 'panel discussion on a stage',
    alt: 'Several speakers seated for a panel discussion.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'webinar-slides',
    provider: 'unsplash',
    query: 'presentation slide on a projector screen',
    alt: 'A slide projected onto a screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-research-lead',
    provider: 'pexels',
    query: 'conference poster session hall',
    alt: 'A hall set up for a conference poster session.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'for-research-triage',
    provider: 'unsplash',
    query: 'papers sorted into piles on a desk',
    alt: 'Academic papers sorted into piles.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-research-compression',
    provider: 'pexels',
    query: 'scientific chart with error bars',
    alt: 'A scientific chart showing error bars.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-research-long-talks',
    provider: 'unsplash',
    query: 'speaker presenting to a large audience',
    alt: 'A speaker addressing a large seated audience.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-research-archive',
    provider: 'pexels',
    query: 'library archive shelving',
    alt: 'Rows of shelving in a library archive.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-research-limits',
    provider: 'unsplash',
    query: 'locked filing cabinet',
    alt: 'A locked metal filing cabinet.',
    width: 1240,
    aspect: '16/9'
  },

  /* ---- Batch 05 - creators, teams, export, how-to ---- */
  {
    id: 'creators-lead',
    provider: 'unsplash',
    query: 'creator filming with a camera in a home studio',
    alt: 'A camera set up for filming in a home studio.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'creators-workflow',
    provider: 'pexels',
    query: 'storyboard sketches pinned to a board',
    alt: 'Storyboard sketches pinned to a board.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'creators-derivative',
    provider: 'unsplash',
    query: 'two identical copies of a document',
    alt: 'Two identical printed documents side by side.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'creators-breadth',
    provider: 'pexels',
    query: 'wide view of many books on a table',
    alt: 'Many open books spread across a large table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'creators-repurpose',
    provider: 'unsplash',
    query: 'single object casting several shadows',
    alt: 'One object casting several shadows.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'creators-limits',
    provider: 'pexels',
    query: 'camera lens cap on a table',
    alt: 'A lens cap resting beside a camera.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'repurpose-lead',
    provider: 'unsplash',
    query: 'typewriter beside a video camera',
    alt: 'A typewriter next to a video camera.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'repurpose-approaches',
    provider: 'pexels',
    query: 'three paths marked on a trail sign',
    alt: 'A trail sign marking three routes.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'repurpose-cut',
    provider: 'unsplash',
    query: 'scissors cutting a strip of paper',
    alt: 'Scissors cutting through a strip of paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'repurpose-scanning',
    provider: 'pexels',
    query: 'person skim reading a printed page',
    alt: 'Someone scanning down a printed page.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'repurpose-reverse',
    provider: 'unsplash',
    query: 'arrows pointing in opposite directions',
    alt: 'Two arrows pointing in opposite directions.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'repurpose-process',
    provider: 'pexels',
    query: 'numbered sticky notes in a row',
    alt: 'Numbered sticky notes arranged in a row.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'show-notes-lead',
    provider: 'unsplash',
    query: 'microphone beside an open notebook',
    alt: 'A microphone beside an open notebook.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'show-notes-elements',
    provider: 'pexels',
    query: 'bulleted list on a clipboard',
    alt: 'A bulleted list held on a clipboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'show-notes-manual',
    provider: 'unsplash',
    query: 'hand writing notes with a pen',
    alt: 'A hand writing notes with a pen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'show-notes-discovery',
    provider: 'pexels',
    query: 'magnifying glass over a list',
    alt: 'A magnifying glass held over a printed list.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'show-notes-checks',
    provider: 'unsplash',
    query: 'proofreading marks on printed text',
    alt: 'Proofreading marks made on printed text.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'show-notes-routine',
    provider: 'pexels',
    query: 'timer on a desk beside a laptop',
    alt: 'A kitchen timer next to a laptop.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'competitor-research-lead',
    provider: 'unsplash',
    query: 'binoculars resting on a map',
    alt: 'Binoculars resting on an open map.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'competitor-patterns',
    provider: 'pexels',
    query: 'repeating pattern of tiles',
    alt: 'A repeating pattern of floor tiles.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'competitor-limits',
    provider: 'unsplash',
    query: 'frosted glass window',
    alt: 'Light through a frosted glass window.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'competitor-ethics',
    provider: 'pexels',
    query: 'boundary line painted on ground',
    alt: 'A painted boundary line on the ground.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'competitor-no-captions',
    provider: 'unsplash',
    query: 'television screen with no picture',
    alt: 'A television screen showing nothing.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'competitor-tracking',
    provider: 'pexels',
    query: 'line chart drawn on graph paper',
    alt: 'A line chart plotted on graph paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'seo-research-lead',
    provider: 'unsplash',
    query: 'desk with laptop and printed research',
    alt: 'A laptop surrounded by printed research pages.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'seo-research-sources',
    provider: 'pexels',
    query: 'newspaper beside a laptop screen',
    alt: 'A newspaper lying beside a laptop.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'seo-research-gap',
    provider: 'unsplash',
    query: 'single missing tile in a wall',
    alt: 'A wall with one tile missing.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'seo-research-quality',
    provider: 'pexels',
    query: 'hallmark stamped on metal',
    alt: 'A hallmark stamped into metal.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'seo-research-limits',
    provider: 'unsplash',
    query: 'road sign showing a dead end',
    alt: 'A dead end road sign.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'seo-research-process',
    provider: 'pexels',
    query: 'flowchart on a whiteboard',
    alt: 'A flowchart drawn on a whiteboard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-teams-lead',
    provider: 'unsplash',
    query: 'small team working around a table',
    alt: 'A small team working together around a table.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'for-teams-sharing',
    provider: 'pexels',
    query: 'document being handed between two people',
    alt: 'A document passed from one person to another.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-teams-attribution',
    provider: 'unsplash',
    query: 'name badges on a table',
    alt: 'Blank name badges laid out on a table.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-teams-archive',
    provider: 'pexels',
    query: 'shared filing cabinet drawers',
    alt: 'Open drawers in a shared filing cabinet.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-teams-convention',
    provider: 'unsplash',
    query: 'printed process diagram on a wall',
    alt: 'A process diagram printed and pinned to a wall.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'for-teams-access',
    provider: 'pexels',
    query: 'key card on a lanyard',
    alt: 'An access card hanging on a lanyard.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'export-markdown-lead',
    provider: 'unsplash',
    query: 'plain text file open on a screen',
    alt: 'A plain text file open on a screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'export-what-survives',
    provider: 'pexels',
    query: 'items packed into a moving box',
    alt: 'Items packed carefully into a box.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'export-immediately',
    provider: 'unsplash',
    query: 'hand pressing a save button',
    alt: 'A finger pressing a button.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'export-format',
    provider: 'pexels',
    query: 'simple paper document beside a sealed envelope',
    alt: 'A plain document beside a sealed envelope.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'export-annotate',
    provider: 'unsplash',
    query: 'margin notes written beside printed text',
    alt: 'Handwritten notes in the margin of a printed page.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'export-limits',
    provider: 'pexels',
    query: 'single file in an empty folder',
    alt: 'One sheet of paper inside an otherwise empty folder.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chatgpt-limits-lead',
    provider: 'unsplash',
    query: 'chat interface open on a laptop',
    alt: 'A chat interface open on a laptop screen.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'chatgpt-long-transcripts',
    provider: 'pexels',
    query: 'very long paper scroll unrolled',
    alt: 'A long paper scroll unrolled across a floor.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chatgpt-comparison',
    provider: 'unsplash',
    query: 'two tools laid side by side',
    alt: 'Two different tools laid side by side.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chatgpt-better-prompt',
    provider: 'pexels',
    query: 'question mark written on paper',
    alt: 'A question mark written on a sheet of paper.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chatgpt-division',
    provider: 'unsplash',
    query: 'fork in a woodland path',
    alt: 'A woodland path splitting in two.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'chatgpt-prompting',
    provider: 'pexels',
    query: 'keyboard keys close up',
    alt: 'A close-up of keyboard keys.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'mobile-lead',
    provider: 'unsplash',
    query: 'person holding a phone showing a video',
    alt: 'A phone held up showing a video playing.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'mobile-approaches',
    provider: 'pexels',
    query: 'phone and laptop side by side',
    alt: 'A phone lying beside a laptop.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'mobile-sharing',
    provider: 'unsplash',
    query: 'phone share menu on screen',
    alt: 'A share menu open on a phone screen.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'mobile-reading',
    provider: 'pexels',
    query: 'person reading on a phone on a train',
    alt: 'Someone reading from a phone on a train.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'mobile-limits',
    provider: 'unsplash',
    query: 'phone with no signal bars',
    alt: 'A phone showing no signal.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'mobile-home-screen',
    provider: 'pexels',
    query: 'phone home screen with app icons',
    alt: 'A phone home screen showing app icons.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'privacy-lead',
    provider: 'unsplash',
    query: 'padlock resting on a laptop keyboard',
    alt: 'A padlock resting on a laptop keyboard.',
    width: 1600,
    eager: true,
    aspect: '1.91/1'
  },
  {
    id: 'privacy-access',
    provider: 'pexels',
    query: 'keyhole in a wooden door',
    alt: 'A keyhole in a wooden door.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'privacy-signup',
    provider: 'unsplash',
    query: 'blank registration form on a desk',
    alt: 'A blank registration form on a desk.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'privacy-policy',
    provider: 'pexels',
    query: 'dense printed terms document',
    alt: 'A densely printed terms document.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'privacy-questions',
    provider: 'unsplash',
    query: 'checklist with question marks',
    alt: 'A checklist marked with question marks.',
    width: 1240,
    aspect: '16/9'
  },
  {
    id: 'privacy-ours',
    provider: 'pexels',
    query: 'open hands held palm up',
    alt: 'Open hands held palms upward.',
    width: 1240,
    aspect: '16/9'
  }
];

export const SLOTS_BY_ID = Object.fromEntries(IMAGE_SLOTS.map((s) => [s.id, s]));
