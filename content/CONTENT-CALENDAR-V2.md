# Content calendar v2 — rebuilt against the live site

The original calendar was generated when the site had 20 pages. It now has 70, and
batches 06-10 had almost nothing left in them:

| | Rows |
|---|---|
| Already published | 15 |
| Overlapped a live page | 16 |
| Needed a feature the product lacks | 9 |
| Genuinely distinct | 10 |

This replaces batches 06-08 with ground the original map missed, found by researching
what competitors actually ship and what the category is searched for.

## What the research turned up

**Destinations, not just output.** Competing tools sync to Notion, Obsidian and
Readwise, and there is a community Obsidian plugin for exactly this. The original map
had one export keyword and no destination pages. We support this today through
Markdown export — it needs pages, not features.

**Content types.** Rivals advertise support by format — TED talks, earnings calls,
news clips, documentaries, interviews. The original map organised by audience and
output instead, so every one of these is uncovered.

**Named-tool comparisons.** "NotebookLM alternative" is a competitive query with many
articles chasing it. We have verified published facts for NotebookLM, NoteGPT and
Glasp, so these can be written on cited evidence rather than invented testing.

**Still blocked.** Roughly 200 keywords across flashcards, mind maps, chat/Q&A and
other platforms need product features that do not exist. Those are excluded here
rather than quietly written around.

## Batch 06 — Destinations and workflows

*Where a summary goes after it is generated. Evidenced by competitors shipping Notion/Obsidian sync and by an Obsidian community plugin existing. Supported today via Markdown export — no new product features required.*

| # | Slug | Focus keyword | Links up to |
|---|---|---|---|
| 1 | `/youtube-to-notion` | youtube to notion | `/export-youtube-summary-markdown` |
| 2 | `/youtube-to-obsidian` | youtube to obsidian | `/export-youtube-summary-markdown` |
| 3 | `/youtube-summary-to-google-docs` | youtube summary google docs | `/export-youtube-summary-markdown` |
| 4 | `/youtube-video-notes-workflow` | youtube video notes workflow | `/youtube-notes-generator` |
| 5 | `/ted-talk-summarizer` | ted talk summarizer | `/` |
| 6 | `/news-video-summarizer` | news video summarizer | `/` |
| 7 | `/documentary-summarizer` | documentary summarizer | `/long-youtube-video-summarizer` |
| 8 | `/earnings-call-summarizer` | earnings call summarizer | `/use-cases/teams` |
| 9 | `/interview-video-summarizer` | interview video summarizer | `/youtube-podcast-summarizer` |
| 10 | `/youtube-summarizer-for-teachers` | youtube summarizer for teachers | `/use-cases/students` |

## Batch 07 — Named comparisons and alternatives

*Commercial-investigation queries against specific tools. We have verified published facts for NotebookLM, NoteGPT and Glasp from their own documentation, so these can be written on cited evidence rather than invented testing.*

| # | Slug | Focus keyword | Links up to |
|---|---|---|---|
| 1 | `/notebooklm-alternative-for-youtube` | notebooklm alternative for youtube | `/best-youtube-summarizer` |
| 2 | `/youtube-summarizer-vs-notebooklm` | youtube summarizer vs notebooklm | `/best-youtube-summarizer` |
| 3 | `/glasp-alternative` | glasp alternative | `/best-youtube-summarizer` |
| 4 | `/notegpt-alternative` | notegpt alternative | `/best-youtube-summarizer` |
| 5 | `/free-alternative-to-paid-youtube-summarizers` | free alternative to paid youtube summarizer | `/best-free-youtube-summarizer` |
| 6 | `/youtube-summarizer-comparison-table` | youtube summarizer comparison | `/best-youtube-summarizer` |
| 7 | `/age-restricted-private-video-summary` | private youtube video summary | `/youtube-summary-not-working` |
| 8 | `/why-is-my-youtube-summary-wrong` | youtube summary inaccurate | `/why-timestamps-matter` |
| 9 | `/youtube-summarizer-spanish` | youtube summarizer spanish | `/multilingual-youtube-summarizer` |
| 10 | `/translate-and-summarize-youtube-video` | translate and summarize youtube video | `/multilingual-youtube-summarizer` |

## Batch 08 — Formats and audiences still uncovered

*Content types competitors advertise support for and we have no page on, plus two professional audiences absent from the use-case set. All are ordinary YouTube video — no new features needed.*

| # | Slug | Focus keyword | Links up to |
|---|---|---|---|
| 1 | `/keynote-summarizer` | keynote summarizer | `/webinar-summarizer` |
| 2 | `/panel-discussion-summarizer` | panel discussion summarizer | `/youtube-podcast-summarizer` |
| 3 | `/product-demo-summarizer` | product demo summarizer | `/youtube-tutorial-summarizer` |
| 4 | `/sermon-summarizer` | sermon summarizer | `/` |
| 5 | `/youtube-summarizer-for-journalists` | youtube summarizer for journalists | `/use-cases/researchers` |
| 6 | `/youtube-summarizer-for-analysts` | youtube summarizer for analysts | `/use-cases/teams` |
| 7 | `/summarize-youtube-video-for-a-meeting` | summarize youtube video for meeting | `/youtube-summarizer-for-teams` |
| 8 | `/youtube-summarizer-accuracy-test` | youtube summarizer accuracy | `/best-youtube-summarizer` |
| 9 | `/how-long-does-it-take-to-summarize-a-video` | how long to summarize a youtube video | `/how-it-works` |
| 10 | `/youtube-summarizer-without-watching` | summarize youtube video without watching | `/how-to-summarize-a-youtube-video` |

## Validation

All 30 slugs checked against the 70 live routes: none already published, none with
an identical keyword set to an existing page, no duplicates within the plan.

## After batch 08

That is 100 pages. Before adding more, the honest recommendation is to stop and
measure — none of these pages are in the site navigation, none have had time to rank,
and there is no data yet on which clusters earn traffic. Another thirty pages written
blind is worth less than knowing which of the first hundred worked.
