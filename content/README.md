# Batch publishing pipeline

Three steps, one of which uses an LLM. Adapted from the WordPress version — the
differences are all in what "publish" means.

## What changed from the WordPress pipeline

| WordPress version | Here | Why |
|---|---|---|
| Fetch slugs via WP REST | Read `site/pages.js` | The route table *is* the CMS |
| `category_id` | `section` string | No taxonomy; sections drive nav and schema |
| POST to `/wp-json/wp/v2/posts` | Write fragment + register route | Static build, no API |
| RankMath focus keyword + meta | `title`/`description` in `pages.js`, `schema.js` | Schema is generated at build time |
| WP featured image upload | `site/images.js` slot + `npm run images` | Keys stay on the build machine |
| Unsplash → Pixabay fallback | Unsplash → Pexels, 7 keys each | Already built, with rate-limit rotation |
| Live on publish | Live on `tools/deploy.py` | Nothing ships until you deploy |

The last row matters most: on WordPress, publishing *is* going live. Here,
publishing installs files. **The site only changes when you deploy.**

## Files

| File | Scope | Purpose |
|---|---|---|
| `ARTICLE-TEMPLATE.md` | Reusable | Format rules, quality bar, voice |
| `SITE-CONFIG.md` | Per project | Brand, sections, pillars, what you may claim |
| `batches/BATCH-NN-SPECS.csv` | Per batch | `number\|section\|slug\|title\|focus_keyword\|cluster\|intent\|page_type\|links_to` |
| `CONTENT-CALENDAR.md` | Per project | All 10 batches, sequenced |
| `.env` | Per project | Image API keys + SSH deploy target (gitignored) |
| `tools/pre_publish.py` | Reusable | Step 1 — validate specs |
| `tools/post_publish.py` | Reusable | Step 3 — validate HTML, install, register |

## Step 1 — Pre-publish (Python, no LLM)

```
python tools/pre_publish.py --batch 01
```

Reads every existing route, then flags: slugs that already exist, duplicates
inside the batch, unknown sections, malformed permalinks, over-long titles,
parents that don't exist yet, and **near-duplicate focus keywords** once
`free`/`online`/`best`/`without` are stripped — the cannibalisation check the
topical map explicitly asks for. Exits non-zero on any error and creates
`content/new-batch-NN/`.

## Step 2 — Writing agents (the only LLM step)

Batches of 10, so one agent per batch is enough. For a larger batch, split rows
across agents.

```
Write 10 HTML page fragments (rows 0101-0110) for YouTubeSummarizer.com.

Read these first:
1. content/ARTICLE-TEMPLATE.md   — format rules and quality standards
2. content/SITE-CONFIG.md        — brand, sections, pillar URLs, claims you may make
3. content/batches/BATCH-01-SPECS.csv — specs (pipe-delimited)

Write each row to content/new-batch-01/{number}-{slug}.html.

Every file must follow ARTICLE-TEMPLATE.md exactly: the META block, 1200-1400
words, one lead image plus 5-7 in-article image tokens, at least one comparison
table, a 3-5 item FAQ, 2+ internal links including the links_to parent, and
1-2 external links with rotated domains. Do not skip any row.

Before writing each article, check the live SERP for its focus keyword and note
what the top pages miss. Do not invent product features — SITE-CONFIG.md lists
what is true today.
```

Also add each article's image slots to `site/images.js` — the fragment only
carries `<!--image:slot-id-->` tokens; the slot definitions (query, alt, width,
aspect) live in that file.

## Step 3 — Post-publish (Python, no LLM)

```
python tools/post_publish.py --batch 01 --dry-run --expected 10   # validate
python tools/post_publish.py --batch 01 --expected 10             # install
npm run images                                                    # fetch photos
npm run build                                                     # render dist/
python tools/deploy.py --dry-run                                  # check
python tools/deploy.py                                            # go live
```

Validation is strict and refuses to install a batch with any failure: word
count, single H1 containing the focus keyword, heading depth, image count and
placement, image reuse across the batch, a comparison table, FAQ count,
internal links resolving, the pillar link, external link count, and banned
anchor text.

## Adapting to another static project

1. Copy `tools/pre_publish.py`, `tools/post_publish.py`, `tools/deploy.py`,
   `tools/keyring.js`, `tools/images.js`, `tools/fetch-images.mjs`.
2. Update `VALID_SECTIONS` in `pre_publish.py` and the route-table regex if the
   new project stores routes differently.
3. Write a new `SITE-CONFIG.md`. Reuse `ARTICLE-TEMPLATE.md` and adjust voice.
4. Point `.env` at the new image keys and SSH target.
5. Adjust `MIN_WORDS`/`MAX_WORDS` and image counts in `post_publish.py` if the
   brief differs.
