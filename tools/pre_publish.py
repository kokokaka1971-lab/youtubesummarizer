"""
Step 1 of the batch pipeline. No LLM.

    python tools/pre_publish.py --batch 01

What it does:
  - reads every existing route from site/pages.js (this site's equivalent of
    "fetch all slugs from WordPress" — the route table IS the CMS here)
  - validates content/batches/BATCH-NN-SPECS.csv: duplicate slugs against the
    live site and within the batch, unknown sections, bad link targets,
    malformed rows
  - creates content/new-batch-NN/ for the writing agents to fill
  - exits non-zero if anything is wrong, so a bad batch never reaches an agent

Fixing specs is cheap. Un-publishing 10 cannibalising pages is not.
"""

import argparse, io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_JS = os.path.join(ROOT, 'site', 'pages.js')

VALID_SECTIONS = {
    'home', 'features', 'how', 'use-cases', 'guides', 'blog',
    'pricing', 'faq', 'about', 'contact', 'legal',
}

FIELDS = ['number', 'section', 'slug', 'title', 'focus_keyword',
          'cluster', 'intent', 'page_type', 'links_to']


def existing_routes():
    """Every path currently registered in site/pages.js."""
    src = io.open(PAGES_JS, encoding='utf-8').read()
    return set(re.findall(r"path:\s*'([^']+)'", src))


def load_specs(path):
    rows = []
    with io.open(path, encoding='utf-8') as f:
        header = f.readline().strip().split('|')
        if header != FIELDS:
            sys.exit('Spec header must be:\n  %s\ngot:\n  %s' % ('|'.join(FIELDS), '|'.join(header)))
        for lineno, line in enumerate(f, 2):
            line = line.strip()
            if not line:
                continue
            parts = line.split('|')
            if len(parts) != len(FIELDS):
                sys.exit('%s line %d: expected %d fields, got %d'
                         % (os.path.basename(path), lineno, len(FIELDS), len(parts)))
            rows.append(dict(zip(FIELDS, parts)))
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--batch', required=True, help='batch number, e.g. 01')
    args = ap.parse_args()
    n = args.batch.zfill(2)

    spec_path = os.path.join(ROOT, 'content', 'batches', 'BATCH-%s-SPECS.csv' % n)
    if not os.path.exists(spec_path):
        sys.exit('No spec file at %s' % spec_path)

    live = existing_routes()
    rows = load_specs(spec_path)
    print('%d existing routes on the site' % len(live))
    print('%d rows in batch %s\n' % (len(rows), n))

    errors, warnings, seen = [], [], {}

    for r in rows:
        slug, num = r['slug'], r['number']
        path = '/' + slug.strip('/')

        if path in live:
            errors.append('%s: /%s already exists on the site' % (num, slug))
        if slug in seen:
            errors.append('%s: slug /%s duplicated in this batch (also row %s)' % (num, slug, seen[slug]))
        seen[slug] = num

        if r['section'] not in VALID_SECTIONS:
            errors.append('%s: unknown section "%s" (valid: %s)'
                          % (num, r['section'], ', '.join(sorted(VALID_SECTIONS))))
        if not re.match(r'^[a-z0-9]+(?:-[a-z0-9]+)*$', slug):
            errors.append('%s: slug "%s" is not a clean lowercase-hyphen permalink' % (num, slug))
        if len(slug) > 60:
            warnings.append('%s: slug is %d chars — long for a permalink' % (num, len(slug)))
        if not r['focus_keyword'].strip():
            errors.append('%s: empty focus_keyword' % num)
        if not r['title'].strip():
            errors.append('%s: empty title' % num)
        elif len(r['title']) > 60:
            warnings.append('%s: title is %d chars — Google truncates near 60' % (num, len(r['title'])))

        # The parent must already exist, or be created earlier in this same batch.
        parent = r['links_to']
        if parent and parent not in live and parent.lstrip('/') not in seen:
            warnings.append('%s: links_to %s does not exist yet — ship the pillar first'
                            % (num, parent))

    # Near-duplicate focus keywords are the cannibalisation risk the topical map warns about.
    def norm(k):
        stop = {'free', 'online', 'best', 'a', 'the', 'to', 'for', 'with', 'without'}
        return frozenset(w for w in re.findall(r'[a-z0-9]+', k.lower()) if w not in stop)

    for i, a in enumerate(rows):
        for b in rows[i + 1:]:
            ka, kb = norm(a['focus_keyword']), norm(b['focus_keyword'])
            if ka and ka == kb:
                warnings.append('%s and %s target the same intent once modifiers are stripped '
                                '("%s" vs "%s") — consider merging'
                                % (a['number'], b['number'], a['focus_keyword'], b['focus_keyword']))

    for w in warnings:
        print('  WARN  %s' % w)
    for e in errors:
        print('  FAIL  %s' % e)

    if errors:
        print('\n%d error(s). Fix the spec file before writing anything.' % len(errors))
        sys.exit(1)

    out_dir = os.path.join(ROOT, 'content', 'new-batch-%s' % n)
    os.makedirs(out_dir, exist_ok=True)
    print('\nOK — %d rows valid%s' % (len(rows), ', %d warning(s)' % len(warnings) if warnings else ''))
    print('Output directory: %s' % os.path.relpath(out_dir, ROOT))
    print('\nFilenames the agents should write:')
    for r in rows[:3]:
        print('  %s-%s.html' % (r['number'], r['slug']))
    print('  ... %d files total' % len(rows))


if __name__ == '__main__':
    main()
