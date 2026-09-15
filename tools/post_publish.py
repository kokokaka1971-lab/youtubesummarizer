"""
Step 3 of the batch pipeline. No LLM.

    python tools/post_publish.py --batch 01 --dry-run --expected 10   # validate only
    python tools/post_publish.py --batch 01 --expected 10             # install + register
    python tools/post_publish.py --batch 01 --images-only             # fetch photos

"Publishing" on a static site is not a REST call. It is:

  1. validate every HTML fragment against content/ARTICLE-TEMPLATE.md
  2. copy fragments into site/pages/
  3. register each route in site/pages.js (title, description, section, schema)
  4. `npm run images`  — fills the image slots via Unsplash -> Pexels
  5. `npm run build`   — renders dist/
  6. `python tools/deploy.py` — SFTP upload

This script does 1-3, and 4 with --images-only. Build and deploy stay separate
and manual, so nothing reaches the live site because a validator passed.
"""

import argparse, io, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_JS = os.path.join(ROOT, 'site', 'pages.js')
PAGES_DIR = os.path.join(ROOT, 'site', 'pages')

META_FIELDS = ['title', 'description', 'section', 'focus_keyword',
               'schema', 'lead_image', 'links_to']

MIN_WORDS, MAX_WORDS = 1200, 1400
MIN_IMAGES, MAX_IMAGES = 6, 8          # 1 lead + 5-7 in-article
BANNED_ANCHORS = re.compile(r'>\s*(click here|read more|learn more)\s*<', re.I)


def parse_meta(html, problems):
    m = re.search(r'<!--META(.*?)-->', html, re.S)
    if not m:
        problems.append('no <!--META--> block')
        return {}
    meta = {}
    for line in m.group(1).strip().splitlines():
        if ':' in line:
            k, v = line.split(':', 1)
            meta[k.strip()] = v.strip()
    for f in META_FIELDS:
        if not meta.get(f):
            problems.append('META missing "%s"' % f)
    d = meta.get('description', '')
    if d and not (120 <= len(d) <= 158):
        problems.append('meta description is %d chars (want 120-158)' % len(d))
    return meta


def body_words(html):
    """Lede + .prose only — the article, not the nav chrome."""
    lede = re.search(r'<p class="lede">(.*?)</p>', html, re.S)
    prose = re.search(r'<div class="prose">(.*)</div>', html, re.S)
    text = (lede.group(1) if lede else '') + ' ' + (prose.group(1) if prose else '')
    text = re.sub(r'<!--.*?-->', '', text, flags=re.S)
    text = re.sub(r'<[^>]+>', ' ', text)
    return len(re.sub(r'&[a-z]+;', ' ', text).split())


def validate(path, live_routes, seen_slots):
    html = io.open(path, encoding='utf-8').read()
    problems = []
    meta = parse_meta(html, problems)

    words = body_words(html)
    if not (MIN_WORDS <= words <= MAX_WORDS):
        problems.append('%d words (want %d-%d)' % (words, MIN_WORDS, MAX_WORDS))

    h1 = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.S)
    if len(h1) != 1:
        problems.append('%d <h1> (want exactly 1)' % len(h1))
    elif meta.get('focus_keyword'):
        kw = meta['focus_keyword'].lower()
        if kw not in re.sub(r'<[^>]+>', '', h1[0]).lower():
            problems.append('focus keyword not in the H1')

    if len(re.findall(r'<h2[^>]*>', html)) < 4:
        problems.append('fewer than 4 <h2> sections')

    slots = re.findall(r'<!--\s*image:([a-z0-9-]+)\s*-->', html)
    if not (MIN_IMAGES <= len(slots) <= MAX_IMAGES):
        problems.append('%d image slots (want %d-%d incl. lead)' % (len(slots), MIN_IMAGES, MAX_IMAGES))
    if len(slots) != len(set(slots)):
        problems.append('an image slot is used twice on this page')
    for s in slots:
        if s in seen_slots:
            problems.append('image slot "%s" already used by %s' % (s, seen_slots[s]))
        seen_slots[s] = os.path.basename(path)

    prose = re.search(r'<div class="prose">(.*)</div>', html, re.S)
    if prose:
        block = prose.group(1)
        last_img = block.rfind('<!--image')
        last_close = max(block.rfind('</p>'), block.rfind('</ul>'), block.rfind('</details>'))
        if last_img > last_close:
            problems.append('an image is the last element of the article')
        internal = re.findall(r'href="(/[^"#]*)"', block)
        if len(internal) < 2:
            problems.append('%d internal links in the body (want at least 2)' % len(internal))
        parent = meta.get('links_to')
        if parent and parent not in internal:
            problems.append('does not link up to its pillar %s' % parent)
        broken = [l for l in internal if l not in live_routes and not l.startswith('/assets')]
        if broken:
            problems.append('internal links do not resolve: %s' % ', '.join(sorted(set(broken))))
        external = re.findall(r'href="(https?://[^"]+)"', block)
        if not (1 <= len(external) <= 2):
            problems.append('%d external links (want 1-2)' % len(external))

    if html.count('<table') < 1:
        problems.append('no comparison table')
    faqs = html.count('<details class="qa"')
    if not (3 <= faqs <= 5):
        problems.append('%d FAQ items (want 3-5)' % faqs)
    if BANNED_ANCHORS.search(html):
        problems.append('generic anchor text ("click here" / "read more")')

    return meta, words, problems


def register(meta, slug, section):
    """Append a route entry to site/pages.js, before the closing brace."""
    src = io.open(PAGES_JS, encoding='utf-8').read()
    key = slug
    if "'%s'" % key in src:
        return False
    schema = ', '.join("'%s'" % s.strip() for s in meta.get('schema', 'article').split(',') if s.strip())
    entry = (
        "  '%s': {\n"
        "    path: '/%s',\n"
        "    file: '%s.html',\n"
        "    section: '%s',\n"
        "    title: '%s',\n"
        "    description:\n      '%s',\n"
        "    schema: [%s]\n"
        "  },\n"
        % (key, slug, slug, section,
           meta['title'].replace("'", "\\'"),
           meta['description'].replace("'", "\\'"),
           schema)
    )
    marker = '\n};'
    idx = src.rindex(marker)
    # The final existing entry may have no trailing comma. Appending after it
    # would produce invalid JS, so add one first.
    head, tail = src[:idx], src[idx:]
    if head.rstrip().endswith('}'):
        stripped = head.rstrip()
        head = stripped + ',' + head[len(stripped):]
    io.open(PAGES_JS, 'w', encoding='utf-8', newline='\n').write(head + '\n' + entry + tail)
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--batch', required=True)
    ap.add_argument('--expected', type=int)
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--images-only', action='store_true')
    args = ap.parse_args()
    n = args.batch.zfill(2)

    if args.images_only:
        print('Fetching images (Unsplash -> Pexels, rotating key pools)...')
        sys.exit(subprocess.call(['npm', 'run', 'images'], cwd=ROOT, shell=(os.name == 'nt')))

    src_dir = os.path.join(ROOT, 'content', 'new-batch-%s' % n)
    if not os.path.isdir(src_dir):
        sys.exit('No %s — run pre_publish.py first.' % os.path.relpath(src_dir, ROOT))

    files = sorted(f for f in os.listdir(src_dir) if f.endswith('.html'))
    if args.expected and len(files) != args.expected:
        print('WARNING: %d files, expected %d\n' % (len(files), args.expected))

    live = set(re.findall(r"path:\s*'([^']+)'", io.open(PAGES_JS, encoding='utf-8').read()))
    seen_slots, ok, failed = {}, [], []

    for fn in files:
        path = os.path.join(src_dir, fn)
        slug = re.sub(r'^\d+-', '', fn[:-5])
        meta, words, problems = validate(path, live | {'/' + slug}, seen_slots)
        if problems:
            failed.append((fn, problems))
            print('FAIL  %s' % fn)
            for p in problems:
                print('        - %s' % p)
        else:
            ok.append((fn, slug, meta, words))
            print('ok    %-52s %d words' % (fn, words))

    print('\n%d passed, %d failed' % (len(ok), len(failed)))
    if failed:
        print('Fix the failures and re-run. Nothing was installed.')
        sys.exit(1)
    if args.dry_run:
        print('Dry run — nothing written.')
        return

    for fn, slug, meta, _ in ok:
        dest = os.path.join(PAGES_DIR, slug + '.html')
        html = io.open(os.path.join(src_dir, fn), encoding='utf-8').read()
        html = re.sub(r'<!--META.*?-->\s*', '', html, count=1, flags=re.S)
        io.open(dest, 'w', encoding='utf-8', newline='\n').write(html)
        added = register(meta, slug, meta['section'])
        print('installed %-46s route %s' % (slug + '.html', 'added' if added else 'already present'))

    print('\nNext:')
    print('  npm run images                 # fill the new image slots')
    print('  npm run build                  # render dist/')
    print('  python tools/deploy.py --dry-run   # check, then run without --dry-run')


if __name__ == '__main__':
    main()
