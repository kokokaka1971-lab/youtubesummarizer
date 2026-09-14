/**
 * YouTube Summarizer — local dev server
 *
 * Serves the homepage from ./public and backs it with two endpoints:
 *   GET  /api/video?id=<videoId>   → real video metadata (YouTube oEmbed)
 *   POST /api/summarize {id}       → a summary of the video
 *
 * The summarize route produces a *real* summary when it can reach both a
 * transcript and the Claude API. When it can't (no API key, no captions, or
 * no network), it falls back to clearly-labelled demo output — the response
 * carries `meta.demo: true` and the UI badges it as such. Nothing is ever
 * presented as a real summary when it isn't one.
 */

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from './site/layout.js';
import { BY_PATH } from './site/pages.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(HERE, 'public');
const PAGES_DIR = path.join(HERE, 'site', 'pages');
const PORT = Number(process.env.PORT) || 4173;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5';
const DEV = process.env.NODE_ENV !== 'production';

/* ------------------------------------------------------------------ */
/* Static files                                                        */
/* ------------------------------------------------------------------ */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

/** Serve a file from public/. Returns false if there is no such file. */
async function serveStatic(res, pathname) {
  const rel = decodeURIComponent(pathname);

  // Resolve inside PUBLIC_DIR only — no path traversal.
  const filePath = path.join(PUBLIC_DIR, path.normalize(rel).replace(/^(\.\.[\\/])+/, ''));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    send(res, 403, 'text/plain', 'Forbidden');
    return true;
  }

  let stat;
  try {
    stat = await fsp.stat(filePath);
  } catch {
    return false;
  }
  if (stat.isDirectory()) return false;

  res.writeHead(200, {
    'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    'Content-Length': stat.size,
    'Cache-Control': DEV ? 'no-cache' : 'public, max-age=3600'
  });
  fs.createReadStream(filePath).pipe(res);
  return true;
}

/* ------------------------------------------------------------------ */
/* Page rendering                                                      */
/* ------------------------------------------------------------------ */

const bodyCache = new Map();

async function pageBody(page) {
  // In dev, re-read every time so edits show up on refresh.
  if (!DEV && bodyCache.has(page.file)) return bodyCache.get(page.file);
  const html = await fsp.readFile(path.join(PAGES_DIR, page.file), 'utf8');
  bodyCache.set(page.file, html);
  return html;
}

async function servePage(res, page, status = 200) {
  const html = renderPage(page, await pageBody(page));
  res.writeHead(status, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': DEV ? 'no-store' : 'public, max-age=300'
  });
  res.end(html);
}

/** robots.txt and sitemap.xml, generated from the page registry. */
function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.values(BY_PATH)
    .filter((p) => p.slug !== '404')
    .map((p) => {
      const loc = 'https://www.youtubesummarizer.com' + p.path;
      const isHome = p.path === '/';
      const isLegal = p.section === 'legal';
      const priority = isHome ? '1.0' : isLegal ? '0.3' : p.section === 'blog' ? '0.6' : '0.8';
      const freq = isHome ? 'daily' : isLegal ? 'yearly' : 'monthly';
      return (
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
      );
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function send(res, code, type, body) {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}
const json = (res, code, obj) => send(res, code, 'application/json; charset=utf-8', JSON.stringify(obj));

/* ------------------------------------------------------------------ */
/* YouTube helpers                                                     */
/* ------------------------------------------------------------------ */

const VALID_ID = /^[a-zA-Z0-9_-]{11}$/;

function withTimeout(ms) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, done: () => clearTimeout(t) };
}

/** Real metadata via YouTube's public oEmbed endpoint (no API key needed). */
async function getVideoMeta(id) {
  const t = withTimeout(8000);
  try {
    const r = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
      { signal: t.signal }
    );
    if (!r.ok) throw new Error('oEmbed ' + r.status);
    const d = await r.json();
    return {
      id,
      title: d.title,
      channel: d.author_name,
      thumb: d.thumbnail_url || `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      resolved: true
    };
  } catch {
    return {
      id,
      title: `YouTube video ${id}`,
      channel: 'Unknown channel',
      thumb: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      resolved: false
    };
  } finally {
    t.done();
  }
}

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

/**
 * Best-effort transcript fetch: read the watch page, pull the caption track
 * list out of the embedded player config, then download the track.
 *
 * Heads-up for production: YouTube currently serves an empty body for
 * `timedtext` downloads from unauthenticated IPs, so this returns null far
 * more often than not. A real deployment needs one of:
 *   - yt-dlp with a proof-of-origin token,
 *   - the YouTube Data API `captions.download` endpoint with OAuth (the video
 *     owner must grant access), or
 *   - a third-party transcript provider.
 * Rather than paper over that, this returns null and the caller falls back to
 * clearly-labelled demo output instead of inventing a summary.
 */
async function getTranscript(id) {
  const t = withTimeout(12000);
  const headers = { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' };

  try {
    const page = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, {
      headers,
      signal: t.signal
    });
    if (!page.ok) return null;
    const html = await page.text();

    const match = html.match(/"captionTracks":(\[.*?\])/);
    if (!match) return null;

    let tracks;
    try {
      tracks = JSON.parse(match[1].replace(/\\u0026/g, '&'));
    } catch {
      return null;
    }
    if (!Array.isArray(tracks) || !tracks.length) return null;

    const track = tracks.find((x) => x.languageCode === 'en') || tracks[0];
    const cr = await fetch(track.baseUrl.replace(/\\u0026/g, '&') + '&fmt=json3', {
      headers: { ...headers, Referer: 'https://www.youtube.com/' },
      signal: t.signal
    });
    if (!cr.ok) return null;

    const raw = await cr.text();
    if (!raw.trim()) return null; // YouTube's "blocked" response: 200, empty body

    let cap;
    try {
      cap = JSON.parse(raw);
    } catch {
      return null;
    }

    const lines = (cap.events || [])
      .filter((e) => e.segs)
      .map((e) => ({
        start: Math.round((e.tStartMs || 0) / 1000),
        text: e.segs.map((s) => s.utf8).join('').replace(/\s+/g, ' ').trim()
      }))
      .filter((e) => e.text);

    return lines.length ? lines : null;
  } catch {
    return null;
  } finally {
    t.done();
  }
}

/* ------------------------------------------------------------------ */
/* Summarization                                                       */
/* ------------------------------------------------------------------ */

const SCHEMA_NOTE = `Return:
- tldr: 2-3 sentences capturing the video's actual argument, not a description of its topic.
- takeaways: 5-8 specific, substantive points. No filler like "the speaker discusses X".
- chapters: 4-8 sections, each with the transcript timestamp (seconds) where it begins.
- notes: 3-5 headed sections of structured notes.
Ground everything in the transcript. Never invent claims that aren't in it.`;

/** Real summarization via the Anthropic SDK. Returns null if unavailable. */
async function summarizeWithClaude(meta, transcript) {
  const hasCreds = process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN;
  if (!hasCreds) return null;

  let Anthropic, z, zodOutputFormat;
  try {
    ({ default: Anthropic } = await import('@anthropic-ai/sdk'));
    ({ z } = await import('zod'));
    ({ zodOutputFormat } = await import('@anthropic-ai/sdk/helpers/zod'));
  } catch {
    console.warn('[summarize] SDK not installed — run `npm install`. Falling back to demo output.');
    return null;
  }

  const Summary = z.object({
    tldr: z.string(),
    takeaways: z.array(z.string()),
    chapters: z.array(
      z.object({ start: z.number(), title: z.string(), summary: z.string() })
    ),
    notes: z.array(z.object({ heading: z.string(), points: z.array(z.string()) }))
  });

  // Timestamp every ~30s so the model can anchor chapters to real moments.
  const body = transcript
    .map((l, i) => (i % 12 === 0 ? `\n[${l.start}s] ${l.text}` : l.text))
    .join(' ');

  const client = new Anthropic();
  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    system:
      'You summarize YouTube videos into notes a busy person can act on. ' +
      'You are precise, concrete, and never pad. ' + SCHEMA_NOTE,
    messages: [
      {
        role: 'user',
        content:
          `Video: ${meta.title}\nChannel: ${meta.channel}\n\n` +
          `Transcript (bracketed numbers are seconds into the video):\n${body}`
      }
    ],
    output_config: { format: zodOutputFormat(Summary) }
  });

  if (response.stop_reason === 'refusal' || !response.parsed_output) return null;
  return response.parsed_output;
}

/** Clearly-labelled placeholder so the UI is reviewable without an API key. */
function demoSummary(meta, reason) {
  const title = meta.title;
  return {
    tldr:
      `This is demo output for “${title}”, not a real summary — it's here so the interface ` +
      `is fully reviewable without credentials. ${reason} With a transcript and an API key, ` +
      `this panel holds two or three sentences capturing the video's actual argument.`,
    takeaways: [
      'Each takeaway is one specific claim from the video, not a description of its topic.',
      'Takeaways are ordered by how much they change what you would do, not by when they were said.',
      'Anything contested in the video is marked as contested rather than flattened into consensus.',
      'Numbers, names, and dates are carried across verbatim so they stay checkable.',
      'Where the speaker hedges, the hedge survives into the summary.',
      'Nothing appears here that is not in the transcript.'
    ],
    chapters: [
      { start: 0, title: 'Opening and framing', summary: 'What the video sets out to answer, and for whom.' },
      { start: 154, title: 'The core argument', summary: 'The central claim, and the evidence offered for it.' },
      { start: 488, title: 'Worked example', summary: 'The argument applied to a concrete case.' },
      { start: 902, title: 'Objections', summary: 'The strongest counterpoints raised and how they are answered.' },
      { start: 1315, title: 'What to do with this', summary: 'The practical upshot and what to read next.' }
    ],
    notes: [
      {
        heading: 'Context',
        points: [
          'Who is speaking and what they are known for.',
          'What question the video is answering.',
          'What background the video assumes you already have.'
        ]
      },
      {
        heading: 'The argument, step by step',
        points: [
          'Each premise, stated in the order it is built.',
          'The evidence attached to each one.',
          'Where the reasoning depends on an assumption rather than a fact.'
        ]
      },
      {
        heading: 'Open questions',
        points: [
          'What the video raises but does not settle.',
          'What a sceptical viewer would still want answered.'
        ]
      }
    ]
  };
}

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

async function handleSummarize(req, res) {
  const chunks = [];
  for await (const c of req) {
    chunks.push(c);
    if (chunks.reduce((n, b) => n + b.length, 0) > 10_000) return json(res, 413, { error: 'Body too large' });
  }

  let id;
  try {
    id = JSON.parse(Buffer.concat(chunks).toString('utf8')).id;
  } catch {
    return json(res, 400, { error: 'Invalid JSON body' });
  }
  if (!VALID_ID.test(id || '')) return json(res, 400, { error: 'That is not a valid YouTube video id.' });

  const t0 = Date.now();
  const [meta, transcript] = await Promise.all([getVideoMeta(id), getTranscript(id)]);

  let summary = null;
  let demo = true;
  let reason = '';

  if (!transcript) {
    reason =
      'No transcript could be fetched — YouTube blocks unauthenticated caption downloads, ' +
      'so this needs yt-dlp with a PO token, the Data API with OAuth, or a transcript provider.';
  } else if (!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN)) {
    reason = 'No ANTHROPIC_API_KEY is set on the server.';
  } else {
    try {
      summary = await summarizeWithClaude(meta, transcript);
      if (summary) demo = false;
      else reason = 'The model call did not return a usable summary.';
    } catch (err) {
      console.error('[summarize]', err.message);
      reason = 'The model call failed: ' + err.message;
    }
  }

  if (!summary) summary = demoSummary(meta, reason);

  const words = transcript ? transcript.reduce((n, l) => n + l.text.split(/\s+/).length, 0) : 0;
  const videoSeconds = transcript ? transcript[transcript.length - 1].start : 0;
  const readWords =
    summary.tldr.split(/\s+/).length +
    summary.takeaways.join(' ').split(/\s+/).length +
    summary.notes.flatMap((s) => s.points).join(' ').split(/\s+/).length;

  json(res, 200, {
    video: meta,
    ...summary,
    meta: {
      demo,
      reason: demo ? reason : '',
      model: demo ? '' : MODEL,
      words,
      videoMinutes: Math.max(1, Math.round(videoSeconds / 60)),
      readMinutes: Math.max(1, Math.round(readWords / 220)),
      ms: Date.now() - t0
    }
  });
}

/**
 * Contact form. Validates, then appends to data/contact-messages.jsonl.
 *
 * This deliberately does NOT send email — wiring it to a real inbox is a
 * deployment decision (a transactional email provider, a helpdesk webhook, a
 * ticket in whatever you use). The response says plainly where the message
 * went so nobody is misled into thinking a human has it.
 */
async function handleContact(req, res) {
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > 50_000) return json(res, 413, { error: 'That message is too long.' });
    chunks.push(c);
  }

  let data;
  try {
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return json(res, 400, { error: 'Invalid request.' });
  }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const message = String(data.message || '').trim();
  const topic = String(data.topic || 'other').trim();

  if (!name || !email || !message) {
    return json(res, 400, { error: 'Please fill in your name, email, and a message.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json(res, 400, { error: "That email address doesn't look right." });
  }
  if (message.length < 10) {
    return json(res, 400, { error: 'Could you add a little more detail?' });
  }

  const record = { at: new Date().toISOString(), name, email, topic, message: message.slice(0, 10_000) };

  try {
    const dir = path.join(HERE, 'data');
    await fsp.mkdir(dir, { recursive: true });
    await fsp.appendFile(path.join(dir, 'contact-messages.jsonl'), JSON.stringify(record) + '\n');
  } catch (err) {
    console.error('[contact]', err.message);
    return json(res, 500, { error: 'Could not save that. Please email support@youtubesummarizer.com instead.' });
  }

  console.log(`[contact] ${topic} from ${email}`);
  json(res, 200, {
    ok: true,
    message:
      'Thanks — your message was saved to data/contact-messages.jsonl on this server. ' +
      'This demo build does not send email yet, so for a real reply use support@youtubesummarizer.com.'
  });
}

/* ------------------------------------------------------------------ */
/* Server                                                              */
/* ------------------------------------------------------------------ */

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Baseline security headers. HSTS only means anything once TLS terminates
  // in front of this, so it is scoped to production.
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  if (!DEV) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  try {
    /* --- API --- */
    if (url.pathname === '/api/video' && req.method === 'GET') {
      const id = url.searchParams.get('id');
      if (!VALID_ID.test(id || '')) return json(res, 400, { error: 'Invalid id' });
      return json(res, 200, await getVideoMeta(id));
    }

    if (url.pathname === '/api/summarize' && req.method === 'POST') {
      return await handleSummarize(req, res);
    }

    if (url.pathname === '/api/contact' && req.method === 'POST') {
      return await handleContact(req, res);
    }

    if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'No such endpoint' });

    /* --- Health check for the host's probe --- */
    if (url.pathname === '/healthz') return send(res, 200, 'text/plain; charset=utf-8', 'ok');

    /* --- Generated files --- */
    if (url.pathname === '/sitemap.xml') {
      return send(res, 200, 'application/xml; charset=utf-8', sitemapXml());
    }
    if (url.pathname === '/robots.txt') {
      return send(
        res,
        200,
        'text/plain; charset=utf-8',
        'User-agent: *\nAllow: /\n\nSitemap: https://www.youtubesummarizer.com/sitemap.xml\n'
      );
    }

    /* --- Static assets --- */
    if (url.pathname.startsWith('/assets/') || path.extname(url.pathname)) {
      if (await serveStatic(res, url.pathname)) return;
    }

    /* --- Pages --- */
    // Trailing slashes redirect to the canonical path, so /features/ and
    // /features don't both exist as far as search engines are concerned.
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      const target = url.pathname.replace(/\/+$/, '') + url.search;
      res.writeHead(301, { Location: target });
      return res.end();
    }

    const page = BY_PATH[url.pathname];
    if (page) return await servePage(res, page);

    return await servePage(res, BY_PATH['/404'], 404);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) json(res, 500, { error: 'Server error' });
  }
});

server.listen(PORT, () => {
  const key = process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN;
  console.log(`\n  YouTube Summarizer running at  http://localhost:${PORT}\n`);
  console.log(
    key
      ? `  Summaries: live (model ${MODEL})\n`
      : '  Summaries: demo output — set ANTHROPIC_API_KEY and run `npm install` for real ones.\n'
  );
});
