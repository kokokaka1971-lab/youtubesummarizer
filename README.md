# YouTubeSummarizer — homepage

A new homepage for youtubesummarizer.com, with a working backend behind the
summarizer box rather than a static mockup.

## Run it

```bash
node server.js          # → http://localhost:4173
```

No install needed to review the design. For real summaries:

```bash
npm install
set ANTHROPIC_API_KEY=sk-ant-...    # PowerShell: $env:ANTHROPIC_API_KEY="sk-ant-..."
node server.js
```

`PORT` and `ANTHROPIC_MODEL` (default `claude-opus-5`) are also read from the
environment.

## What's here

```
site/layout.js            the page shell — nav, footer, head. One source of truth.
site/pages.js             the route table: every URL on the site
site/pages/*.html         page bodies (fragments, no <html> wrapper)
public/assets/styles.css  design system, homepage, and interior pages
public/assets/site.js     shared: theme, nav, reveal, pricing toggle, contact form
public/assets/app.js      the summarizer (homepage only)
public/assets/logo.svg    the brand mark
public/assets/favicon.svg favicon (SVG, crisp at any size)
public/assets/icon-*.png  apple-touch-icon and large app icon
server.js                 router + /api/video, /api/summarize, /api/contact
data/                     contact form submissions (created on first message)

site/images.js            the photo slots: id, search query, alt text
site/image-manifest.json  what those slots resolved to — file + photographer
site/image-tag.js         expands <!--image:slot--> into a <figure> at render
tools/keyring.js          rotating API-key pool (see below)
tools/images.js           Unsplash + Pexels clients
tools/fetch-images.mjs    `npm run images` — resolve slots, download, credit
public/assets/img/*.jpg   the downloaded photos, served from our own domain
```

## Photos

Photography comes from Unsplash and Pexels, fetched **at build time and never
from the browser**. That is a security decision, not a performance one: the
site deploys as static files to Apache shared hosting, where no process of ours
is running, so a key used from the page would sit in plain sight in devtools
and be scraped within days. Instead the keys stay on your machine, the photos
are downloaded once into `public/assets/img/`, and what ships is ordinary
`<img>` tags pointing at our own domain. Visitors never contact either provider.

```
npm run images                    fetch anything not already on disk
npm run images -- --refresh <id>  re-pick one slot
npm run images -- --refresh all   re-pick everything
npm run images -- --dry-run       search only, download nothing
```

Keys live in `.env`, which is gitignored and never copied into `dist/`:

```
UNSPLASH_ACCESS_KEYS=key1,key2,...
PEXELS_API_KEYS=key1,key2,...
```

**Key rotation.** Both providers rate-limit per key per hour — Unsplash allows
only 50 requests/hour on a demo app, which a full refresh can approach. So each
provider gets a pool. `tools/keyring.js` spends one key until it is finished,
then moves to the next:

- every response carries `x-ratelimit-remaining`, so a key is usually retired on
  the request *before* it would have failed, rather than by burning one;
- a 429 (or Unsplash's 403 "Rate Limit Exceeded") retires the key and **retries
  the same request** on the next one, so a rate limit never surfaces as an error;
- a key the provider rejects outright is dropped for the run, not retried;
- a retired key comes back when its window resets — Pexels states the reset time
  in a header, Unsplash's is a rolling hour;
- when a whole pool is dry the fetcher falls back to the *other provider* rather
  than failing, which is the main reason to configure both.

Nothing logs a key value; messages say `key #3 of 7`.

Re-running is free: slots already on disk are skipped, so only a `--refresh`
costs quota. A fresh clone that hasn't fetched yet still builds — tokens expand
to nothing and the build warns once.

**Attribution** is carried from the API through `site/image-manifest.json` into
a `<figcaption>` on every photo, with the UTM parameters Unsplash's guidelines
require. `tools/fetch-images.mjs` also pings Unsplash's `download_location`
endpoint whenever a photo is used, which their API terms require.

Photos are cropped to their final aspect ratio at the CDN, so the saved file is
exactly what gets painted: `width`/`height` on the `<img>` reserve the right box
and the photo's own dominant colour fills it while it loads — no layout shift.
Each page's lead photo also becomes its `og:image`.

## Deploying

There is no CI: `dist/` is uploaded to the host, so a commit changes nothing on
the live site until someone deploys.

```
npm run build
python tools/deploy.py --dry-run     # what would change
python tools/deploy.py               # back up the remote, then upload
```

Transport is SFTP over SSH. The server's host key is pinned in
`tools/known_hosts` (public keys, safe to commit) and an unknown key is
*rejected* rather than auto-trusted, so a substituted server fails the
connection instead of quietly receiving the password. Credentials come from the
gitignored `.env`:

```
SSH_HOST, SSH_PORT, SSH_USER, SSH_PASS, SSH_DIR
```

`SSH_DIR` matters more than it looks. The hosting account carries more than one
site, and the SSH login lands in the *home* directory, not a web root — so the
target is `domains/youtubesummarizer.com/public_html` and the script refuses to
run against anything not ending in `public_html`. A stray value there would
scatter 53 files across an unrelated site.

Every run tars the current remote into `ytsum-backup-<timestamp>.tar.gz` in the
home directory first; `--no-backup` skips it.

Avoid plain FTP on port 21. It works, but it sends the password in clear text,
and the certificate does not verify against the bare IP.

### Asset caching

`.htaccess` caches CSS and JS for seven days and HTML for five minutes, and the
filenames carry no fingerprint. That combination silently breaks deploys: a
returning visitor pairs fresh HTML with a week-old stylesheet, so a CSS change
appears not to have shipped. `site/layout.js` therefore appends a hash of each
asset's contents to its URL (`/assets/styles.css?v=9960c83f`). A changed file
gets a new URL and is fetched at once; an unchanged one keeps its URL and stays
cached. If you ever reference a new asset from the shell, run it through that
same helper rather than hard-coding the path.

## Site map

19 pages, all rendered through the same shell.

| Section | Pages |
|---|---|
| Product | `/features`, `/how-it-works`, `/pricing`, and `/#try` for the summarizer itself |
| Use cases | `/use-cases` plus `/students`, `/researchers`, `/creators`, `/teams` under it |
| Company | `/about`, `/faq`, `/contact`, `/blog` + three posts |
| Legal | `/privacy`, `/terms`, `/cookies` |
| Errors | `/404` |

`/sitemap.xml` and `/robots.txt` are generated from `site/pages.js`, so they
can't drift from the real routes. Trailing slashes 301 to the canonical path.

**Adding a page:** drop an `.html` fragment in `site/pages/`, add an entry to
`site/pages.js`, and add it to the `NAV` or `FOOTER` array in `site/layout.js` if
it should be linked. Nothing else needs touching.

### Before launch

- **The legal pages are unreviewed drafts.** They're written to describe what the
  app actually does — the cookie table matches the real storage keys — but they
  have not been through a lawyer. Each carries an HTML comment saying so. The
  governing-law clause, entity name, liability cap, and sub-processor list are
  placeholders.
- **The contact form does not send email.** It validates and appends to
  `data/contact-messages.jsonl`, and the success message says exactly that. Wire
  `handleContact()` in `server.js` to a real provider before launch.
- **"Sign in" in the nav points at `/pricing`** — there's no auth in this build.
- Stats figures, pricing, and the three blog posts' publication dates are
  invented placeholder content.

## The logo

A play triangle resolving into three condensing lines — video on the left,
the notes it becomes on the right, reading left to right. Drawn on a 32×32 grid
so it snaps to whole pixels, and verified legible down to 16px on both light and
dark backgrounds.

The brand gradient (`#FF5A36` → `#E2242C`) is defined **once** in a hidden `<svg>`
at the top of `index.html` as `#ysGrad`; every inline instance of the mark
references it, so there's a single place to change the brand colour. The
standalone `logo.svg` and `favicon.svg` carry their own copy so they work when
loaded on their own.

To regenerate the PNG icons after changing the mark, render `logo.svg` full-bleed
(no rounded corners — iOS applies its own mask) at 180px and 512px.

## What's actually wired up

- **Live video lookup.** Typing or pasting a link resolves the real title,
  channel, and thumbnail through YouTube's public oEmbed endpoint, debounced,
  with the newest lookup winning.
- **URL parsing** for `watch?v=`, `youtu.be/`, `/shorts/`, `/embed/`, `/live/`,
  `youtube-nocookie.com`, and bare 11-character ids.
- **Four summary views** (TL;DR, takeaways, timestamped chapters, full notes) as
  a proper ARIA tablist with arrow-key navigation. Chapter timestamps are real
  deep links into the video.
- **Export** — copy as Markdown, or download a `.md` file named after the video.
- **Recent history** in `localStorage`, click to re-run; clearing it really
  clears it.
- **Theme toggle** (light/dark/system) applied before first paint, so there's no
  flash of the wrong palette.
- **Keyboard**: `/` focuses the input, `Ctrl`+`Enter` runs, `Esc` blurs.
- **Deep link**: `/?v=VIDEO_ID` runs that video on load.
- `prefers-reduced-motion` respected, print stylesheet, skip link,
  focus-visible rings throughout.

## SEO

Built from the live SERP for "youtube summarizer", not from guesswork. Every
page ranking on page one used the same title formula — the head term **"YouTube
Video Summarizer"** plus the modifiers **free / AI / online / no sign-up** — and
the same page shape: what-it-is → features → numbered how-to → use cases by role
→ FAQ, at roughly 1,200–1,500 words.

The homepage was losing on all of it. The exact phrase "youtube video
summarizer" appeared **zero times**, the H1 was "Watch less. Know more.", and
there was no structured data anywhere on the site.

| Element | Now |
|---|---|
| Title | `YouTube Video Summarizer — Free AI Summaries, No Sign-Up` (56 chars, no truncation) |
| Meta description | 146 chars, leads with the action and the differentiators |
| H1 | `Free YouTube Video Summarizer` — the brand line survives as the serif tagline beneath it |
| H2s | Rewritten to match real queries: "What is a YouTube video summarizer?", "How to summarize a YouTube video in 3 steps", "YouTube video summarizer FAQ" |
| Body | 1,570 words, exact keyword 5×, ~1.1% density |
| FAQ | 10 questions, up from 6 — the new ones target long-tail ("how do I summarize a YouTube video for free", Shorts, podcasts, vs. ChatGPT) |
| Schema | WebSite, Organization, SoftwareApplication, HowTo, FAQPage + BreadcrumbList — all validated |
| Sitemap | `lastmod`, `changefreq`, per-section priority |
| 404 | `noindex, follow` |

### Every other page got the same treatment

| Page | H1 | Schema |
|---|---|---|
| `/features` | YouTube Summarizer Features | — |
| `/how-it-works` | How to Summarize a YouTube Video | HowTo |
| `/pricing` | YouTube Summarizer Pricing | **Product + AggregateOffer** |
| `/use-cases` | YouTube Summarizer Use Cases | Breadcrumb |
| `/use-cases/*` | YouTube Summarizer for Students / Researchers / Creators / Teams | Breadcrumb |
| `/faq` | YouTube Summarizer FAQ | FAQPage (19 Q) |
| `/about` | About YouTubeSummarizer | AboutPage |
| `/contact` | Contact YouTubeSummarizer | ContactPage |
| `/blog` | YouTubeSummarizer Blog | Blog |
| `/blog/*` | unchanged — already query-shaped | **BlogPosting** |

Three thin pages were filled out: `/use-cases` 216 → 454 words, `/contact`
189 → 401, `/blog` 203 → 354. Every page now sits in a sane title (≤60 chars) and
description (70–160) range, has exactly one H1, and validates.

### FAQ schema is generated, not duplicated

`faqFromBody()` in `site/schema.js` builds the FAQPage markup by parsing the
page's own visible `<details>` blocks at render time. Google requires FAQ markup
to match what the visitor sees, and hand-maintained copies always drift —
this one structurally can't. It picked up all 19 questions on `/faq` with no
extra work, and both pages verify as exact matches.

### Correction on rich results

An earlier version of this file claimed HowTo and FAQPage markup would earn
expanded SERP listings. That is no longer true: **Google retired HowTo rich
results in 2023 and FAQ rich results on 7 May 2026.** The markup is kept because
it still describes the page to AI Overviews and other answer engines — which
increasingly cite structured content — and costs nothing to carry. But the
schema types that still produce *visible* rich results are Organization,
BreadcrumbList, **Product/Offer** (`/pricing`) and **Article/BlogPosting**
(`/blog/*`), which is why those were the priority in this pass.

### What I deliberately left out, and why

`aggregateRating` in the SoftwareApplication schema. It would put star ratings in
the search result and it is tempting, but review snippets require ratings from
real collected reviews. The 4.9 on the homepage is placeholder content, and
shipping it as schema is precisely what Google's fake-review spam policy targets
— the downside is a site-wide manual action, which costs far more than the stars
gain. Add it once real reviews exist: uncomment nothing, just add an
`aggregateRating` object with your true `ratingValue` and `reviewCount`.

### What this can and can't do

This gets the page technically competitive with what currently ranks — matched
intent, better depth, richer markup than most of them. It does not by itself
produce a #1 ranking. Position also depends on domain authority, backlinks, and
how long the site has existed, and `youtubesummarizer.com` is competing with
established domains. The exact-match domain is a genuine asset here. The levers
left are off-page: earning links, and publishing more of the blog content that
targets the informational queries feeding this market.

## The editorial section

`#what-is` on the homepage is built as a magazine spread rather than a content
block, because it's the one place on the page carrying a long-form argument.

Composition: an asymmetric opening spread (lead text left, a data figure right),
a full-width serif pull quote, a four-item numbered sequence on hairline rules,
and a coda. No cards, no boxes, no borders heavier than 1px.

Details worth preserving if you edit it:

- **The drop cap is tuned to exact line math.** `font-size × line-height` equals
  exactly two lines of body text (16.8px × 1.72), so the third line starts flush
  instead of half-indented against the float. Change the paragraph's font size or
  leading and the cap needs retuning — there's a mobile override for the same
  reason.
- **The figure's bars animate on reveal** via `scaleX`, reusing the existing
  `.reveal` observer rather than adding script.
- **No stock photography.** The section makes a quantitative argument (5,000
  spoken words carry ~400 words of content), so the honest illustration is that
  data, drawn as a figure. Generic laptop-and-coffee stock would have been the
  "generic" look this redesign was meant to avoid, and it would illustrate
  nothing. If you want photography here later, the figure column is the slot for
  it — but it should be a real product screenshot, not stock.

### Blog

`/blog` already existed with three posts and a footer link; what it was missing
was a place in the main nav and a layout consistent with everything else.

- **Added to the primary nav** (`NAV` in `site/layout.js`), which also puts it in
  the mobile menu automatically. It was already in the footer's Company column.
  Blog posts share `section: 'blog'`, so the nav item stays highlighted while
  reading a post, not just on the index.
- **The index came off the card layout.** It was the last `.post-card` grid on
  the site — bordered, shadowed boxes. It's now a dated archive: the date and
  reading time in a left ledger column, the piece on the right, hairline rows,
  with the same accent rule filling on hover that the use-case index uses. Below
  760px the date becomes a strap line above the title.

## Navigation structure

Both menus are generated from `NAV` and `FOOTER` in `site/layout.js` — the only
place either is defined.

**Main nav — five items:** Home · Product ▾ · Pricing · Blog · FAQ

Features, How it works and Use cases are all "explain the product" pages, so they
took three of seven top-level slots while doing one job. They now sit under a
**Product** disclosure menu with a one-line description each. Nothing lost a
home, and the bar went from 954px of content to **819px**.

The menu is a real disclosure, not a hover-only trick: a `<button>` with
`aria-expanded` / `aria-controls`, opened by click or `↓`, closed by `Esc`,
outside click, or focus leaving the group. Hover is added only for
`(hover: hover) and (pointer: fine)`, so touch uses the same click path. On
mobile there is no dropdown at all — the mobile menu lists the pages flat under a
"Product" label, which is less to get wrong. The Product trigger reads as current
whenever one of its three pages is open.

**Footer — four columns mirroring the nav:**

| Product | Use cases | Company | Legal |
|---|---|---|---|
| Features | Students | About | Privacy |
| How it works | Researchers | Blog | Terms |
| Use cases | Creators | FAQ | Cookies |
| Pricing | Teams | Contact | |

Two fixes here: the `/use-cases` hub had no footer link at all (only its four
children did), and "Summarize a video" was listed under Product while the brand
block beside it already carried the same call to action.

**Nav breakpoint tracks the item count** — the links collapse to the menu button
before they crowd:

| Top-level items | Bar needed | Collapse below |
|---|---|---|
| 7 (flat) | 954px | 1020px |
| **5 (grouped)** | **819px** | **900px** |

Grouping bought back 120px of breakpoint, so the full nav now survives down to
910px instead of 1024px. Re-measure if you add another item.

### Hero polish pass

Three fixes after review:

- **The tagline was rendering larger than the H1.** Both used independent
  `clamp()`s, and at 1280px they resolved to 56px against 52px — the hierarchy
  was inverted. The tagline is now sized as a fraction of the headline and holds
  a 0.73–0.77 ratio from 360px to 1280px.
- **The hero glow was still anchored for the old centred layout** (`at 50% 32%`,
  with a negative top inset), which read as a pink band clipped under the nav.
  It's now two soft pools — one behind the headline, a fainter one behind the
  sheet — so it looks like lighting rather than an artefact.
- **`flex-wrap: wrap` + `flex-direction: column` was overflowing the input.**
  In a wrapping column container the flex line is sized to the widest item's
  *max-content*, so `.field` took 371px inside a 309px parent and the Paste
  button was cut off the screen at 360px. `flex-wrap: nowrap` in the stacked
  breakpoint fixes it. Worth knowing: it was overflowing its container at 390px
  too, just not far enough to clip visibly.

### The hero

Was a centred stack: pill, headline, tagline, lede, form, hint, chips, stats —
eight blocks down the middle of a 1140px page. Once the sections below it became
asymmetric editorial layouts, the hero was the thing reading as a different
template.

It's now a two-column composition: the pitch and the tool on the left, a
**"What comes back"** sheet on the right showing the real result panel. That
sheet is the only element in the hero carrying a shadow, because it's the only
one meant to read as a surface above the page.

**The sheet's tabs are interactive.** They started as decorative `<span>`s inside
an `aria-hidden` wrapper, which looked clickable and wasn't. They're now a proper
tablist — four `<button>`s with `aria-selected`/`aria-controls` and one panel
each (TL;DR, Takeaways, Chapters, Notes), following the same keyboard contract as
the summarizer's own tabs: arrows move and select, `Home`/`End` jump to the ends,
and roving `tabindex` keeps one stop in the tab order.

`.hp-body` carries a `min-height` floor so switching panels doesn't bounce the
sheet's height — worth keeping if you edit the panel copy.

The redundant pill went: "Free · No sign-up · 38 languages" repeated the lede
and the facts row underneath it.

**The usage metrics are gone, and that was deliberate.** "4.2M videos
summarized", "1.1M hours given back" and a "4.9 average rating" were placeholder
numbers I invented earlier. A star rating with no reviews behind it is a trust
liability, not a trust signal — and it's the same fabrication problem that keeps
`aggregateRating` out of the schema. They're replaced by four product facts that
are each verifiable elsewhere on this site:

| | |
|---|---|
| **38** | languages, in and out |
| **4** | summary depths from one run |
| **5** | free summaries a day, no card |
| **0** | accounts needed to start |

If you want real usage numbers there once you have them, the markup is
`.hero-facts` and it takes any number/label pair.

### The FAQ

Was ten identical white cards stacked in a narrow centre column — the most
repetitive block on the page, and the one with the widest dead margins.

The accordion itself is **restyled globally**: hairline rows, no boxes, no
shadows, with the open row and its plus/minus picking up the accent. That covers
`/faq`, `/how-it-works` and `/pricing` as well, so every accordion on the site
matches.

On the homepage it also gains a masthead (heading left, intro and "read every
question" right) and **two columns** of questions, which uses the page width and
roughly halves the section's height.

Two implementation notes:

- The columns are **two explicit `.faq` wrappers**, not CSS multicol. Opening a
  row then reflows only its own column; multicol would reflow both and shuffle
  items between them.
- Below 900px they stack, and the second wrapper's first row drops back to a
  normal hairline so the join is invisible.

The FAQ schema still matches: `faqFromBody()` parses the rendered `<details>`
blocks, so the wrapper divs changed nothing — 10/10 on the homepage, 19/19 on
`/faq`, verified after the restructure.

### The closing CTA

Was a rounded white card with a pink radial-gradient wash, a shadow and a
border — three treatments doing one job, and the last floating box on the site.

Now an editorial sign-off band: a strong hairline above, a quiet one below, the
statement on the left and the supporting line plus button on the right. No card,
no gradient, no shadow.

The statement is set in **Instrument Serif italic**, which completes the site's
type system: sans carries information, serif italic carries the brand's voice —
the hero tagline, this closing line, and the footer sign-off. Those three are the
only places it appears at size.

`.cta-box` and `.post-cta` now share one rule set, so the close reads identically
on all 12 pages that use it and the three blog posts. On posts the bottom rule is
suppressed (`.post-cta { border-bottom: 0 }`) because `.post-nav` directly below
brings its own top rule and the two doubled up.

**Copy note:** the homepage line still reads "You have 400 hours of watch-later."
That's rhetoric aimed at the reader rather than a product claim, so it isn't in
the same category as the invented usage metrics I removed from the hero — but if
you'd rather not assert a number about the visitor at all, that's the one to
change.

### The footer

Was the default four-column link dump: fifteen links at identical weight, a
brand block with a one-line tagline and a lot of dead space beneath it, and no
reason to be there other than navigation.

It's now a colophon. The brand block carries the sign-off set in Instrument
Serif — the one editorial flourish down there — and a underlined link back into
the tool, so the left half does something. The link columns keep their job but
gain hierarchy: small-caps headers on hairlines, more air between rows, and a
hover that shifts and tints.

It lives in `footerHtml()` in `site/layout.js`, so this applies to all 19 pages
at once. Verified rendering on the homepage, a marketing page, a blog post, a
legal page and the 404.

One label note: the Product column's "Summarize a video" wrapped to two lines in
the narrow column, so it's shortened to "Summarize". The full phrasing survives
on the CTA link in the brand block just above it.

### Pricing — a rate card

Was three boxed cards with a "Most popular" badge sticker and fourteen pink
circle-check bullets. Now a rate card: three columns divided by vertical
hairlines, no boxes, prices set in Instrument Serif like every other figure on
the site. The recommended plan is marked by a 2px accent rule across the top of
its column instead of a badge, and included items are hairline rows rather than
repeated tick icons.

The billing toggle moved from under the heading to sit beside it, which also
stopped the section opening with a third centred stack.

**`/pricing` was ported to the same markup.** It used the identical `.plan`
cards, so leaving it would have given the site two different pricing
presentations one click apart. Both surfaces now share `.rate*`, and the three
plan blocks on `/pricing` are generated from the homepage copy by
`apply-rate.mjs` so they can't silently diverge. The comparison table below them
is untouched.

Alignment details worth keeping: `.rate-tag` has a fixed `height`, not
`min-height` — the tagged column otherwise sat ~4px below the untagged ones. And
`.rate-list` is top-aligned; bottom-aligning it left a ragged top edge on the
plan with fewer lines.

### The features ledger

Was a 3×2 grid of identical white cards with pink rounded-square icon chips —
the textbook generic card layout, six features weighted equally when they aren't,
and three separations (border + shadow + fill) where one hairline does the job.

The section's own lede already framed a comparison — *"most tools hand you a wall
of transcript; this one hands you something you can act on"* — so it's now set as
one: a spec-sheet ledger with a one-word key, the common failure mode, and ours.
Six rows, hairline-separated, contrast carried by weight and colour rather than
ticks and crosses.

The one-word keys (Compression, Verification, Depth, Languages, Fidelity,
Portability) are still `<h3>`s, so the heading outline and scannability survive
the change; the keyword-bearing text moved into the row bodies.

Below 900px the three columns stack and each cell labels itself ("Most tools" /
"Here") via `.fx-mini`, which is hidden on desktop where the column headers do
that job.

**The claims about "most tools" are fair, not strawman** — they're the failure
modes documented in `/blog/transcripts-are-not-summaries` and
`/blog/why-timestamps-matter`. No competitor is named. Keep it that way.

### The use-case index

`#usecases` was a tabbed white card — the one remaining generic SaaS block on
the page, and it hid three of its four entries behind tabs. It's now an editorial
contents page: a sticky heading column on the left, four hairline-separated
entries on the right, all visible at once.

Each entry carries a "Lives in" line naming the one output that role actually
reaches for (chapter map / TL;DR / reading many at once / takeaways). That's what
keeps four similar rows from reading as repetition.

Two side effects worth noting: all four entries are now crawlable (tab panels
were not), and the tab CSS and JS are gone — `site.js` lost its use-case tab
block, and `.uc-tabs` / `.uc-tab` / `.uc-panel` were removed from the stylesheet.
`.uc-card` and `.uc-grid` stay; the `/use-cases` pages still use them.

## Mobile

Measured against real 360px and 390px viewports, not eyeballed. No horizontal
overflow on any page type. Specifically for touch:

- **Tabs become grids.** Both the use-case tabs and the summary tabs used to
  scroll horizontally, which hid the fourth option ("Teams", "Full notes")
  with no affordance that it existed. Below 680px they're 2×2 grids instead.
- **Inputs are 16px on mobile.** Anything smaller makes iOS zoom the page when
  the field takes focus.
- **Tap targets are 38–43px** (they were 23–32px — footer links were the worst).
- **The keyboard hint is hidden.** `/` to focus and `Ctrl`+`Enter` mean nothing
  on a phone, so only "free, no signup" survives.
- **"Start free" moved into the mobile menu**, since the nav button is hidden
  below 420px.

## The one honest gap: transcripts

`/api/summarize` needs a transcript before it can summarize anything. YouTube
currently returns **HTTP 200 with an empty body** for `timedtext` caption
downloads from unauthenticated IPs — I verified this against several videos and
client parameter combinations, so the transcript fetch in `server.js` will
usually return `null` on a plain deployment.

When that happens (or when no API key is set), the endpoint returns clearly
labelled **demo output**: `meta.demo` is `true`, the UI shows a "Demo output"
badge, and `meta.reason` states exactly why. Nothing fake is ever presented as a
real summary.

To close the gap in production, pick one:

| Option | Notes |
|---|---|
| `yt-dlp` with a proof-of-origin token | Most practical; shell out and parse the VTT |
| YouTube Data API `captions.download` | Official, but requires OAuth from the video owner |
| A third-party transcript provider | Simplest to integrate, costs per call |

Swap it in at `getTranscript()` in `server.js` — return
`[{ start: <seconds>, text: <string> }]` and the real Claude path takes over
automatically, no other changes needed.

## Notes on the model call

`summarizeWithClaude()` uses the official `@anthropic-ai/sdk` with
`messages.parse()` and a Zod schema, so the four panels are filled from a
validated structured response instead of parsed prose. Adaptive thinking is on.
Server-side refusal fallbacks are not enabled — worth adding if this ever sees
untrusted input.

Copy and stats on the page are placeholders for a real product: the usage
numbers in the stats strip and the pricing tiers are invented and should be
replaced with your real figures before this goes live.
