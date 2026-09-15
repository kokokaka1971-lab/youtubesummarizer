/* ============================================================
   Shared site behaviour — runs on every page.
   Each block no-ops when its elements aren't present.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Toast (shared with app.js via window.ysToast) ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('is-on'));
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-on');
      setTimeout(() => { toastEl.hidden = true; }, 260);
    }, 2400);
  }
  window.ysToast = toast;

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  function currentTheme() {
    const set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  const themeBtn = $('#themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('ys-theme', next); } catch (e) {}
    });
  }

  /* ---------- Nav ---------- */
  const nav = $('#nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.hidden;
      mobileMenu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    $$('#mobileMenu a').forEach((a) =>
      a.addEventListener('click', () => {
        mobileMenu.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Hero "what comes back" sheet ---------- */
  /* Was decorative markup; these are real tabs now, so they follow the same
     keyboard contract as the summary tabs in app.js. */
  const hpTabs = $$('.hp-tabs [role="tab"]');
  if (hpTabs.length) {
    const selectHp = (tab) => {
      hpTabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle('is-on', on);
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (!panel) return;
        panel.hidden = !on;
        panel.classList.toggle('is-on', on);
      });
    };

    hpTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectHp(tab));
      tab.addEventListener('keydown', (e) => {
        let next = null;
        if (e.key === 'ArrowRight') next = hpTabs[(i + 1) % hpTabs.length];
        else if (e.key === 'ArrowLeft') next = hpTabs[(i - 1 + hpTabs.length) % hpTabs.length];
        else if (e.key === 'Home') next = hpTabs[0];
        else if (e.key === 'End') next = hpTabs[hpTabs.length - 1];
        if (!next) return;
        e.preventDefault();
        next.focus();
        selectHp(next);
      });
    });
  }

  /* ---------- Nav disclosure menus ---------- */
  $$('.nav-has-menu').forEach((wrap) => {
    const trigger = $('.nav-trigger', wrap);
    const panel = $('.nav-panel', wrap);
    if (!trigger || !panel) return;

    let hoverTimer;
    const open = () => {
      clearTimeout(hoverTimer);
      panel.hidden = false;
      // let the panel exist before transitioning it in
      requestAnimationFrame(() => wrap.classList.add('is-open'));
      trigger.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      clearTimeout(hoverTimer);
      wrap.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      setTimeout(() => {
        if (!wrap.classList.contains('is-open')) panel.hidden = true;
      }, 180);
    };
    const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      isOpen() ? close() : open();
    });

    // Hover is a convenience for mice only; touch gets click, which is the
    // same code path.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      wrap.addEventListener('mouseenter', open);
      wrap.addEventListener('mouseleave', () => {
        hoverTimer = setTimeout(close, 120);
      });
    }

    // Close once focus leaves the whole group, so tabbing out tidies up.
    wrap.addEventListener('focusout', (e) => {
      if (!wrap.contains(e.relatedTarget)) close();
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        open();
        const first = $('a', panel);
        if (first) requestAnimationFrame(() => first.focus());
      }
    });

    panel.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      close();
      trigger.focus();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        close();
        trigger.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (isOpen() && !wrap.contains(e.target)) close();
    });
  });

  const yr = $('#yrNow');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- Pricing toggle (homepage and /pricing) ---------- */
  const moBtn = $('#mo');
  const yrBtn = $('#yr');
  if (moBtn && yrBtn) {
    function setBilling(yearly) {
      moBtn.classList.toggle('is-active', !yearly);
      yrBtn.classList.toggle('is-active', yearly);
      moBtn.setAttribute('aria-pressed', String(!yearly));
      yrBtn.setAttribute('aria-pressed', String(yearly));
      $$('.amt').forEach((el) => {
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = yearly ? el.dataset.y : el.dataset.m;
          el.style.opacity = '1';
        }, 130);
      });
      $$('.per').forEach((el) => {
        el.textContent = yearly ? '/mo, billed yearly' : '/month';
      });
    }
    moBtn.addEventListener('click', () => setBilling(false));
    yrBtn.addEventListener('click', () => setBilling(true));
  }

  /* ---------- Contact form ---------- */
  const cForm = $('#contactForm');
  if (cForm) {
    const status = $('#cStatus');
    const submit = $('#cSubmit');

    cForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-note';

      const data = Object.fromEntries(new FormData(cForm).entries());
      if (!data.name || !data.email || !data.message) {
        status.textContent = 'Please fill in your name, email, and a message.';
        status.classList.add('is-error');
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
        status.textContent = "That email address doesn't look right.";
        status.classList.add('is-error');
        return;
      }

      submit.classList.add('is-busy');
      submit.disabled = true;
      try {
        // Static builds post to a form service; the Node server handles
        // /api/contact itself. Both return JSON.
        const endpoint = cForm.dataset.endpoint || '/api/contact';

        // The static build ships with a placeholder form id. Until a real one
        // is filled in, posting would fail with a generic error and the
        // message would be lost — so hand it to the user's mail client
        // instead, with everything they typed already in the draft.
        if (/FORM_ID/.test(endpoint)) {
          const to = cForm.dataset.mailto || 'support@youtubesummarizer.com';
          const subject = 'Website enquiry — ' + (data.topic || 'other');
          const body = [
            'Name: ' + data.name,
            'Email: ' + data.email,
            'Topic: ' + (data.topic || 'other'),
            '',
            data.message
          ].join(String.fromCharCode(10));
          window.location.href =
            'mailto:' + to +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);
          status.textContent =
            'Opening your email app with the message ready to send. If nothing ' +
            'happened, email ' + to + ' directly.';
          status.classList.add('is-ok');
          submit.classList.remove('is-busy');
          submit.disabled = false;
          return;
        }

        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        });
        const out = await r.json().catch(() => ({}));
        if (!r.ok) {
          throw new Error(
            out.error || out.errors?.[0]?.message || 'Could not send that — please email us instead.'
          );
        }
        cForm.reset();
        status.textContent =
          out.message || "Thanks — that's with us. We'll reply within a working day.";
        status.classList.add('is-ok');
        toast('Message received');
      } catch (err) {
        status.textContent = err.message;
        status.classList.add('is-error');
      } finally {
        submit.classList.remove('is-busy');
        submit.disabled = false;
      }
    });
  }
})();
