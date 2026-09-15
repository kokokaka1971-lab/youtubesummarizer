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
  }
];

export const SLOTS_BY_ID = Object.fromEntries(IMAGE_SLOTS.map((s) => [s.id, s]));
