/* ============================================================
   Homepage summarizer. Loaded only on /.
   Shared behaviour (theme, nav, reveal, toasts) lives in site.js.
   ============================================================ */
(function () {
  'use strict';

  if (!document.getElementById('sumForm')) return; // not the homepage

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const toast = window.ysToast || function () {};


  /* ============================================================
     The summarizer
     ============================================================ */

  const form = $('#sumForm');
  const input = $('#url');
  const field = $('#field');
  const submitBtn = $('#submitBtn');
  const errorEl = $('#error');
  const preview = $('#preview');
  const pvThumb = $('#pvThumb');
  const pvTitle = $('#pvTitle');
  const pvChannel = $('#pvChannel');
  const result = $('#result');

  let currentVideo = null;   // { id, title, channel, thumb }
  let currentSummary = null; // API payload

  /** Extract an 11-character YouTube video id from any common URL shape. */
  function parseVideoId(raw) {
    if (!raw) return null;
    const s = raw.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;

    let u;
    try {
      u = new URL(s.startsWith('http') ? s : 'https://' + s);
    } catch (e) {
      return null;
    }
    const host = u.hostname.replace(/^www\.|^m\./, '');
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (!/(^|\.)youtube(-nocookie)?\.com$/.test(host)) return null;

    const v = u.searchParams.get('v');
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

    const m = u.pathname.match(/\/(embed|shorts|live|v)\/([a-zA-Z0-9_-]{11})/);
    return m ? m[2] : null;
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
    field.classList.add('is-error');
  }
  function clearError() {
    errorEl.hidden = true;
    field.classList.remove('is-error');
  }

  /* --- Live preview as the user types --- */
  let previewToken = 0;
  async function updatePreview(id) {
    const token = ++previewToken;
    preview.hidden = false;
    pvThumb.src = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
    pvThumb.alt = '';
    pvTitle.textContent = 'Loading video details…';
    pvChannel.textContent = '—';

    try {
      const r = await fetch('/api/video?id=' + encodeURIComponent(id));
      if (!r.ok) throw new Error('lookup failed');
      const data = await r.json();
      if (token !== previewToken) return; // a newer lookup won
      currentVideo = {
        id,
        title: data.title,
        channel: data.channel,
        thumb: data.thumb || pvThumb.src
      };
      pvTitle.textContent = data.title;
      pvChannel.textContent = data.channel;
      if (data.thumb) pvThumb.src = data.thumb;
    } catch (e) {
      if (token !== previewToken) return;
      currentVideo = { id, title: 'YouTube video ' + id, channel: 'Unknown channel', thumb: pvThumb.src };
      pvTitle.textContent = 'Video ' + id;
      pvChannel.textContent = 'Details unavailable offline';
    }
  }

  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    clearError();
    const id = parseVideoId(input.value);
    field.classList.toggle('is-valid', !!id);

    if (!id) {
      preview.hidden = true;
      currentVideo = null;
      return;
    }
    if (currentVideo && currentVideo.id === id) return;
    debounce = setTimeout(() => updatePreview(id), 220);
  });

  $('#pvClear').addEventListener('click', () => {
    input.value = '';
    preview.hidden = true;
    currentVideo = null;
    field.classList.remove('is-valid');
    clearError();
    input.focus();
  });

  /* --- Paste button --- */
  $('#pasteBtn').addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return toast('Clipboard is empty');
      input.value = text.trim();
      input.dispatchEvent(new Event('input'));
      input.focus();
    } catch (e) {
      input.focus();
      toast('Press Ctrl+V to paste');
    }
  });

  /* --- Sample chips --- */
  $$('.chip').forEach((chip) =>
    chip.addEventListener('click', () => {
      input.value = chip.dataset.url;
      input.dispatchEvent(new Event('input'));
      form.requestSubmit();
    })
  );

  /* --- Keyboard shortcuts --- */
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) {
      e.preventDefault();
      input.focus();
      input.select();
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      form.requestSubmit();
    }
    if (e.key === 'Escape' && document.activeElement === input) input.blur();
  });

  /* --- Result tabs --- */
  const tabs = $$('.tab');
  function selectTab(tab) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = $('#' + t.getAttribute('aria-controls'));
      panel.hidden = !on;
      panel.classList.toggle('is-active', on);
    });
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      next.focus();
      selectTab(next);
    });
  });

  /* --- Rendering --- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function skeleton(lines) {
    return (
      '<div class="skel">' +
      Array.from({ length: lines }, (_, i) =>
        `<div class="skel-line" style="width:${[100, 94, 88, 97, 72][i % 5]}%"></div>`
      ).join('') +
      '</div>'
    );
  }

  function showSkeleton() {
    result.hidden = false;
    $('#resTitle').textContent = currentVideo ? currentVideo.title : 'Working…';
    $('#resSub').textContent = 'Pulling the transcript and reading it through…';
    $('#resFoot').innerHTML = '';
    selectTab($('#tab-tldr'));
    $('#panel-tldr').innerHTML = skeleton(3);
    $('#panel-points').innerHTML = skeleton(6);
    $('#panel-chapters').innerHTML = skeleton(6);
    $('#panel-notes').innerHTML = skeleton(9);
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hhmmss(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    return (h ? h + ':' + String(m).padStart(2, '0') : String(m)) + ':' + String(s).padStart(2, '0');
  }

  function render(data) {
    currentSummary = data;
    const vid = data.video;

    $('#resTitle').textContent = vid.title;
    $('#resSub').textContent = vid.channel + (data.meta.words ? ' · ' + data.meta.words.toLocaleString() + ' words of transcript' : '');

    $('#panel-tldr').innerHTML = `<p class="lead-line">${esc(data.tldr)}</p>`;

    $('#panel-points').innerHTML =
      '<ul class="bullets">' +
      data.takeaways.map((t) => `<li>${esc(t)}</li>`).join('') +
      '</ul>';

    $('#panel-chapters').innerHTML =
      '<div class="chapters">' +
      data.chapters
        .map(
          (c) => `
          <a href="https://www.youtube.com/watch?v=${esc(vid.id)}&t=${c.start}s" target="_blank" rel="noopener">
            <span class="ts">${hhmmss(c.start)}</span>
            <span>
              <span class="ch-title">${esc(c.title)}</span>
              <span class="ch-desc" style="display:block">${esc(c.summary)}</span>
            </span>
          </a>`
        )
        .join('') +
      '</div>';

    $('#panel-notes').innerHTML = data.notes
      .map((sec) => {
        const body = sec.points
          ? '<ul class="bullets">' + sec.points.map((p) => `<li>${esc(p)}</li>`).join('') + '</ul>'
          : `<p>${esc(sec.body)}</p>`;
        return `<h3>${esc(sec.heading)}</h3>${body}`;
      })
      .join('');

    const parts = [
      data.meta.demo
        ? '<span class="badge is-demo">Demo output</span>'
        : '<span class="badge">Model: ' + esc(data.meta.model) + '</span>',
      `<span>Generated in ${(data.meta.ms / 1000).toFixed(1)}s</span>`
    ];
    // Only meaningful when we actually had a transcript to measure against.
    if (data.meta.words) {
      parts.splice(1, 0,
        `<span>Read in ~${data.meta.readMinutes} min instead of ${data.meta.videoMinutes} min of video</span>`);
    }
    if (data.meta.reason) parts.push(`<span>${esc(data.meta.reason)}</span>`);
    $('#resFoot').innerHTML = parts.join('');

    saveRecent(vid);
  }


  /* --- Demo output, generated in the browser ---------------------------
     On static hosting there is no /api/summarize to call. Rather than
     showing a network error on the page's main call to action, we render
     the same demo payload the server would have returned, with the same
     "Demo output" badge and a reason. Nothing is presented as a real
     summary that isn't one. */
  function localDemo(video, reason, ms) {
    return {
      video,
      tldr:
        'This is demo output for \u201c' + video.title + '\u201d, not a real summary — ' +
        'it is here so the interface is fully reviewable. ' + reason +
        ' With a transcript connected, this panel holds two or three sentences ' +
        "capturing the video's actual argument.",
      takeaways: [
        'Each takeaway is one specific claim from the video, not a description of its topic.',
        'Takeaways are ordered by how much they change what you would do.',
        'Anything contested in the video is marked as contested rather than flattened.',
        'Numbers, names and dates are carried across verbatim so they stay checkable.',
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
        { heading: 'Context', points: ['Who is speaking and what they are known for.', 'What question the video is answering.', 'What background it assumes you already have.'] },
        { heading: 'The argument, step by step', points: ['Each premise, in the order it is built.', 'The evidence attached to each one.', 'Where the reasoning rests on an assumption rather than a fact.'] },
        { heading: 'Open questions', points: ['What the video raises but does not settle.', 'What a sceptical viewer would still want answered.'] }
      ],
      meta: { demo: true, reason, model: '', words: 0, videoMinutes: 0, readMinutes: 1, ms }
    };
  }

  /* --- Submit --- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const id = parseVideoId(input.value);
    if (!id) {
      showError(
        input.value.trim()
          ? "That doesn't look like a YouTube link. Try something like youtube.com/watch?v=… or youtu.be/…"
          : 'Paste a YouTube link to get started.'
      );
      input.focus();
      return;
    }

    submitBtn.classList.add('is-busy');
    submitBtn.disabled = true;
    showSkeleton();

    try {
      const t0 = Date.now();
      let data = null;

      try {
        const r = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        // A static host answers with its 404 page, not JSON — that is the
        // signal that there is no summarizer behind this deployment.
        const ct = r.headers.get('content-type') || '';
        if (!ct.includes('application/json')) throw new Error('no-api');
        data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Something went wrong');
      } catch (err) {
        if (err.message !== 'no-api' && !(err instanceof TypeError)) throw err;
        data = localDemo(
          currentVideo || { id, title: 'YouTube video ' + id, channel: '', thumb: '' },
          'Transcript access is not connected on this deployment yet.',
          Date.now() - t0
        );
      }

      render(data);
    } catch (err) {
      result.hidden = true;
      showError(err.message || 'Could not reach the summarizer service.');
    } finally {
      submitBtn.classList.remove('is-busy');
      submitBtn.disabled = false;
    }
  });

  /* --- Export --- */
  function toMarkdown() {
    if (!currentSummary) return '';
    const d = currentSummary;
    const v = d.video;
    const lines = [
      '# ' + v.title,
      '',
      `**Channel:** ${v.channel}  `,
      `**Source:** https://www.youtube.com/watch?v=${v.id}`,
      '',
      '## TL;DR',
      '',
      d.tldr,
      '',
      '## Key takeaways',
      ''
    ];
    d.takeaways.forEach((t) => lines.push('- ' + t));
    lines.push('', '## Chapters', '');
    d.chapters.forEach((c) =>
      lines.push(`- [${hhmmss(c.start)}](https://www.youtube.com/watch?v=${v.id}&t=${c.start}s) **${c.title}** — ${c.summary}`)
    );
    lines.push('', '## Full notes', '');
    d.notes.forEach((s) => {
      lines.push('### ' + s.heading, '');
      if (s.points) s.points.forEach((p) => lines.push('- ' + p));
      else lines.push(s.body);
      lines.push('');
    });
    lines.push('---', '', `_Summarized with YouTubeSummarizer${d.meta.demo ? ' (demo output)' : ''}._`);
    return lines.join('\n');
  }

  $('#copyBtn').addEventListener('click', async () => {
    const md = toMarkdown();
    if (!md) return;
    try {
      await navigator.clipboard.writeText(md);
      toast('Summary copied as Markdown');
    } catch (e) {
      toast('Copy failed — select the text instead');
    }
  });

  $('#mdBtn').addEventListener('click', () => {
    const md = toMarkdown();
    if (!md) return;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download =
      (currentSummary.video.title || 'summary')
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 60)
        .toLowerCase() + '.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Markdown downloaded');
  });

  /* --- Recent (localStorage) --- */
  const RECENT_KEY = 'ys-recent';
  function readRecent() {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }
  function saveRecent(v) {
    try {
      const list = readRecent().filter((x) => x.id !== v.id);
      list.unshift({ id: v.id, title: v.title, channel: v.channel, thumb: v.thumb });
      localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 6)));
    } catch (e) {}
    renderRecent();
  }
  function renderRecent() {
    const list = readRecent();
    const wrap = $('#recent');
    if (!list.length) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    $('#recentList').innerHTML = list
      .map(
        (v) => `<li><button type="button" data-id="${esc(v.id)}">
          <img src="${esc(v.thumb || 'https://i.ytimg.com/vi/' + v.id + '/mqdefault.jpg')}" alt="" loading="lazy" />
          <span style="min-width:0">
            <span class="rt" style="display:block">${esc(v.title)}</span>
            <span class="rc">${esc(v.channel)}</span>
          </span>
        </button></li>`
      )
      .join('');
    $$('#recentList button').forEach((b) =>
      b.addEventListener('click', () => {
        input.value = 'https://www.youtube.com/watch?v=' + b.dataset.id;
        input.dispatchEvent(new Event('input'));
        form.requestSubmit();
      })
    );
  }
  $('#clearRecent').addEventListener('click', () => {
    try { localStorage.removeItem(RECENT_KEY); } catch (e) {}
    renderRecent();
    toast('Recent cleared');
  });
  renderRecent();

  /* --- Deep link: /?v=VIDEO_ID --- */
  const qv = new URLSearchParams(location.search).get('v');
  if (qv && parseVideoId(qv)) {
    input.value = 'https://www.youtube.com/watch?v=' + parseVideoId(qv);
    input.dispatchEvent(new Event('input'));
    form.requestSubmit();
  }
})();
