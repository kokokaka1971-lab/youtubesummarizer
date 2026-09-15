# ARTICLE-TEMPLATE — format rules and quality standards

Reusable across projects. Tweak the voice section per niche; everything else is
the quality bar `tools/post_publish.py` enforces automatically.

## Output format

One file per row: `new-batch-NN/<number>-<slug>.html`

The file is a **page fragment** — no `<!doctype>`, `<html>`, `<head>` or `<body>`.
`site/layout.js` supplies the shell, nav, footer and schema. It opens with a
META comment block that the post-publish script parses to build the route entry:

```html
<!--META
title: YouTube Transcript Summarizer
description: Turn a raw YouTube transcript into a summary you can check, with timestamps on every claim. Free, no sign-up.
section: guides
focus_keyword: youtube transcript summarizer
schema: article, faq
lead_image: guides-transcript-summarizer
links_to: /
-->
```

All seven META fields are required. `description` must be 120–158 characters.

## Page body structure

```html
<section class="page-head">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="kicker">Guides</p>
    <h1>...</h1>          <!-- exactly one H1, contains the focus keyword -->
    <p class="lede">...</p>
    <div class="head-actions">
      <a class="btn btn-primary btn-lg" href="/#try">Summarize a video</a>
    </div>
  </div>
</section>

<section class="section pt-0">
  <div class="wrap wrap-narrow">
    <!--image:LEAD-SLOT-->      <!-- the lead image, 1.91:1 -->
  </div>
</section>

<section class="section">
  <div class="wrap wrap-narrow">
    <div class="prose">
      ... article body: H2 / H3, paragraphs, lists, one or more tables,
          in-article <!--image:...--> tokens, then the FAQ ...
    </div>

    <div class="post-cta">
      <h2>...</h2>
      <p>...</p>
      <a class="btn btn-primary btn-lg" href="/#try">Summarize a video — free</a>
    </div>

    <!--related-->
  </div>
</section>
```

`<!--related-->` expands to the "Keep reading" cards. Put it last, after the CTA.

## Hard requirements (the script fails the file if any are missing)

| Rule | Check |
|---|---|
| Length | 1,200–1,400 words, counting the lede + `.prose` only |
| H1 | Exactly one, containing the focus keyword |
| Headings | At least 4 `<h2>`; H3 nested under H2, never skipping a level |
| Images | 1 lead + 5–7 in-article `<!--image:-->` tokens |
| Image placement | Never the last element of `.prose` |
| Image reuse | No slot used twice on a page, or on any other page |
| Alt text | Every slot in `site/images.js` has descriptive `alt` |
| Table | At least one `.tbl` comparison table |
| FAQ | 3–5 `<details class="qa">` items with real answers |
| Internal links | ≥ 2 in the body, including the `links_to` parent; all must resolve |
| External links | 1–2, domain rotated per SITE-CONFIG, all returning 200 |
| Anchors | No "click here", "read more", "learn more" |
| Paragraphs | 2–4 sentences; at most one longer paragraph per article |
| Uniqueness | No duplicated section across articles in the batch |

## Comparison tables

Required wherever a reader is comparing: A vs B, alternatives, pros and cons,
features, pricing, plans, specs. Wrap for mobile:

```html
<div class="tbl-wrap">
  <table class="tbl">
    <caption>Transcript vs summary</caption>
    <thead><tr><th scope="col"></th><th scope="col">A</th><th scope="col">B</th></tr></thead>
    <tbody>
      <tr><th scope="row">Row label</th><td>...</td><td>...</td></tr>
    </tbody>
  </table>
</div>
```

`.tbl-wrap` scrolls horizontally on narrow screens. Always use `scope` on
headers. Keep cells short — a table of paragraphs is not scannable.

## FAQ

```html
<h2>Frequently asked questions</h2>
<div class="faq">
  <details class="qa">
    <summary>Question?<span class="qa-chev" aria-hidden="true"></span></summary>
    <div class="qa-body"><p>Answer.</p></div>
  </details>
</div>
```

Draw questions from People Also Ask and related searches. FAQ schema is built
**from these visible blocks**, so the markup cannot drift from the content —
which also means a fake FAQ becomes fake structured data. Only ask questions a
reader actually has.

## E-E-A-T

- Say what the tool cannot do, near where you claim what it can.
- Prefer tested specifics ("a 90-minute talk gives ~12,000 transcript words")
  to adjectives.
- Cite a source for any factual claim you did not verify yourself, and quote it
  accurately — check the source says what you claim before publishing.
- Never invent statistics, test results, user counts or review quotes.

## SEO

Focus keyword in the H1, the first 100 words, one H2, and the meta description —
then stop. Use semantic variants (`summarize`, `video summary`, `key points`,
`timestamps`) rather than repeating the exact phrase. If a sentence reads worse
with the keyword in it, leave the keyword out.

## Writing style

Short paragraphs, whitespace, bullets and numbered lists where they help. Lead
with the answer, then explain. Cut any sentence that survives deletion.
