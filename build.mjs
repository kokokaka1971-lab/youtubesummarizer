/**
 * Static build — renders every page to plain HTML for Apache hosting.
 *
 *   node build.mjs      →  dist/
 *
 * Hostinger's shared plans (Premium / Business / Cloud) run PHP on Apache and
 * cannot keep a Node process alive, so server.js can't run there. Everything
 * this site serves is static content, though, so it exports cleanly. The three
 * API routes don't come along:
 *
 *   /api/video      → app.js already falls back to the thumbnail + video id
 *   /api/summarize  → app.js falls back to demo output, badged as such
 *   /api/contact    → the form posts to the endpoint in its data-endpoint attr
 *
 * Pages are written as `<path>.html` (not `<path>/index.html`) so the .htaccess
 * rewrite can serve them at extensionless URLs *without* a redirect. That keeps
 * the live URLs identical to the canonical tags and sitemap, which use no
 * trailing slash.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from './site/layout.js';
import { PAGES, BY_PATH } from './site/pages.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'dist');
const PAGES_DIR = path.join(HERE, 'site', 'pages');
const SITE = 'https://www.youtubesummarizer.com';

async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true });
  for (const entry of await fs.readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst);
    else await fs.copyFile(src, dst);
  }
}

function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.values(BY_PATH)
    .filter((p) => p.slug !== '404')
    .map((p) => {
      const isHome = p.path === '/';
      const isLegal = p.section === 'legal';
      const priority = isHome ? '1.0' : isLegal ? '0.3' : p.section === 'blog' ? '0.6' : '0.8';
      const freq = isHome ? 'daily' : isLegal ? 'yearly' : 'monthly';
      return (
        `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
      );
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const HTACCESS = `# YouTubeSummarizer — Apache config for Hostinger shared hosting.

Options -MultiViews -Indexes

# /blog and /use-cases exist as both a .html file and a directory. Without
# this, Apache would redirect /blog -> /blog/ and then fail to find an index.
DirectorySlash Off

RewriteEngine On

# --- 1. Force HTTPS -------------------------------------------------------
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://www.youtubesummarizer.com/$1 [R=301,L]

# --- 2. Apex -> www, so one address is canonical --------------------------
RewriteCond %{HTTP_HOST} !^www\\. [NC]
RewriteRule ^(.*)$ https://www.youtubesummarizer.com/$1 [R=301,L]

# --- 2b. Blog posts moved from /blog/<slug> to /<slug> --------------------
# These URLs were live and indexed, so they redirect rather than 404. Permanent,
# because the move is permanent — a 302 here would keep the old URL in the index.
RewriteRule ^blog/(how-to-study-from-youtube|why-timestamps-matter|transcripts-are-not-summaries)/?$ /$1 [R=301,L]

# --- 3. Strip .html if anyone requests it directly ------------------------
RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[\\s?] [NC]
RewriteRule ^ /%1 [R=301,L]

# --- 4. Drop trailing slashes, matching the canonical tags ----------------
RewriteRule ^(.+)/$ /$1 [R=301,L]

# --- 5. Serve /features from features.html, URL unchanged -----------------
# No !-d test here on purpose: /blog must resolve to blog.html, not blog/.
RewriteCond %{REQUEST_FILENAME}\\.html -f
RewriteRule ^(.*)$ $1.html [L]

ErrorDocument 404 /404.html

# --- Security headers (server.js sets these too; Apache must repeat them) --
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# --- Caching: assets are fingerprint-free, so keep HTML short-lived -------
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 5 minutes"
  ExpiresByType text/css "access plus 7 days"
  ExpiresByType application/javascript "access plus 7 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType image/svg+xml "access plus 30 days"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml
</IfModule>
`;

async function build() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  await copyDir(path.join(HERE, 'public'), OUT);

  let count = 0;
  for (const [slug, page] of Object.entries(PAGES)) {
    const body = await fs.readFile(path.join(PAGES_DIR, page.file), 'utf8');
    const html = renderPage({ ...page, slug }, body);

    // "/" -> index.html, "/use-cases/students" -> use-cases/students.html
    const rel = page.path === '/' ? 'index.html' : page.path.replace(/^\//, '') + '.html';
    const dest = path.join(OUT, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, html);
    count++;
  }

  await fs.writeFile(path.join(OUT, 'sitemap.xml'), sitemapXml());
  await fs.writeFile(
    path.join(OUT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
  );
  await fs.writeFile(path.join(OUT, '.htaccess'), HTACCESS);

  console.log(`dist/ built — ${count} pages, plus assets, sitemap.xml, robots.txt and .htaccess`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
