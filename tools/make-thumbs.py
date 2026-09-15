"""
Generate card thumbnails for the "Keep reading" block.

    python tools/make-thumbs.py

Each blog post's featured photo is cropped to 4:3 and written alongside it as
<name>-thumb.jpg. No API calls and no new photographs: a card thumbnail stands
for the article it links to, so it should be that article's own featured image.

Featured photos are 1.91:1, so a 4:3 crop takes the centre and drops the sides.
Output is 400x300 — 2x the ~200px the cards render at.
"""

import json, os, sys

try:
    from PIL import Image
except ImportError:
    sys.exit('Pillow is required: python -m pip install Pillow')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'public', 'assets', 'img')

# Featured photo per blog post.
# Every page that can appear as a "Keep reading" card needs a thumbnail.
# Read straight from pages.js so adding a page does not mean editing this list.
import re as _re
_pages = open(os.path.join(ROOT, 'site', 'pages.js'), encoding='utf-8').read()
_manifest = json.load(open(os.path.join(ROOT, 'site', 'image-manifest.json'), encoding='utf-8'))
LEADS = [_manifest[s]['file'][:-4] for s in _re.findall(r"cardImage: '([^']+)'", _pages) if s in _manifest]

W, H = 400, 300
made = 0

for name in LEADS:
    src = os.path.join(IMG, f'{name}.jpg')
    if not os.path.exists(src):
        print(f'  missing {name}.jpg — run `npm run images` first')
        continue

    im = Image.open(src).convert('RGB')
    target = W / H
    w, h = im.size
    if w / h > target:                     # too wide: trim the sides
        new_w = int(round(h * target))
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    else:                                  # too tall: trim top and bottom
        new_h = int(round(w / target))
        top = (h - new_h) // 2
        im = im.crop((0, top, w, top + new_h))

    im = im.resize((W, H), Image.LANCZOS)
    dst = os.path.join(IMG, f'{name}-thumb.jpg')
    im.save(dst, 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'  {name}-thumb.jpg  {os.path.getsize(dst) // 1024} KB')
    made += 1

print(f'{made} thumbnails written to public/assets/img/')
