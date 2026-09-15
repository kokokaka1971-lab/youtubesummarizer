# SITE-CONFIG — YouTubeSummarizer.com

Per-project context. Every writing agent reads this before starting.

## Brand

- **Name:** YouTubeSummarizer
- **Domain:** https://www.youtubesummarizer.com
- **Product:** paste a YouTube link, get a TL;DR, key takeaways, and timestamped
  chapters you can click. Free tier, no sign-up, 38 languages, Markdown export.

## How this site differs from a WordPress site

There is no CMS. A page is three things:

1. An HTML **fragment** in `site/pages/<path>.html` — no `<html>`, `<head>` or
   `<body>`, just the sections. The shell comes from `site/layout.js`.
2. A **route entry** in `site/pages.js` carrying `path`, `file`, `section`,
   `title`, `description`, `schema`, and optional `crumbs`.
3. A **build** (`npm run build`) and a **deploy** (`python tools/deploy.py`).

Nothing is live until step 3 runs. A merged commit changes nothing on its own.

## Voice

Direct, concrete, skeptical of easy claims. Second person. Short paragraphs.
Em-dashes over semicolons. State the limitation before the reader finds it —
the site's credibility rests on admitting what summarization loses.

Avoid: "unlock", "revolutionize", "in today's fast-paced world", "game-changer",
stacked adjectives, and any sentence that would survive being deleted.

## Sections (the `section` field — this site's equivalent of a WP category)

| section | Used for | Example |
|---|---|---|
| `home` | The money page | `/` |
| `features` | Feature landing pages | `/features` |
| `how` | How-to guides | `/how-it-works` |
| `use-cases` | Audience landing pages | `/use-cases/students` |
| `guides` | **New batch pages** | `/youtube-transcript-summarizer` |
| `blog` | Editorial posts | `/blog/why-timestamps-matter` |
| `pricing`, `faq`, `about`, `contact`, `legal` | Existing utility pages | — |

New batch pages use `guides` unless the spec says otherwise.

## Pillar pages for internal linking

Every article links **up** to its parent pillar and to the tool. Use descriptive
anchors, never "click here" / "read more" / "learn more".

| Pillar | URL | Link to it when writing about |
|---|---|---|
| The tool | `/` | Any transactional page — this is the conversion target |
| Features | `/features` | Chapters, depths, languages, export |
| How it works | `/how-it-works` | Process, steps, what the tool cannot do |
| Pricing | `/pricing` | Free limits, Pro, Team |
| FAQ | `/faq` | Captions, length limits, accuracy, privacy |
| Students | `/use-cases/students` | Lectures, revision, exams |
| Researchers | `/use-cases/researchers` | Talks, citations, triage |
| Creators | `/use-cases/creators` | Repurposing, show notes, research |
| Teams | `/use-cases/teams` | Shared history, API, pipelines |
| Timestamps (editorial) | `/blog/why-timestamps-matter` | Verification, accuracy, hedges |
| Transcripts (editorial) | `/blog/transcripts-are-not-summaries` | Captions, raw transcript, ASR |
| Studying (editorial) | `/blog/how-to-study-from-youtube` | Retention, retrieval practice |

The `links_to` column in each batch CSV names the required parent. Add one or
two more contextual links beyond it.

## External links

One or two per article, and **rotate the domain** — do not put the same source on
every page. Already used, pick something else where possible:

| Domain | Used on | Good for |
|---|---|---|
| learningscientists.org | `/blog/how-to-study-from-youtube` | Retrieval practice, spacing |
| arxiv.org | `/blog/why-timestamps-matter` | Summarization faithfulness |
| support.google.com | `/blog/transcripts-are-not-summaries` | YouTube captions behaviour |

Verify every external URL returns 200 before publishing.

## Images

Do **not** hotlink or invent image URLs. Images come from the build-time
pipeline, which holds the API keys on the build machine and downloads files into
`public/assets/img/`:

1. Add a slot to `site/images.js` — `id`, `provider`, `query`, `alt`, `width`,
   `aspect`, and `eager: true` for the page's lead image.
2. Place `<!--image:slot-id-->` in the fragment where the photo belongs.
3. Run `npm run images`.

Lead images are 1.91:1 at 1600px; in-article are 16:9 at 1240px. Never put an
image at the very end of an article.

## Claims you may make

True today: free tier with no sign-up, timestamped clickable chapters, four
summary depths, 38 languages, Markdown export.

**Not true today** — do not write pages promising these until the product ships
them: Vimeo/TikTok/Twitch/MP4 support, flashcards, mind maps, Anki export, a
Chrome extension, a public API. Batches 9 and 10 contain pages that depend on
these. Check before writing, and skip the row if the feature does not exist.
