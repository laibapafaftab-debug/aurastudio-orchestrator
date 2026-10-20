/* =====================================================================
   AuraStudio — site script
   LEAD FORM SETUP: paste your n8n (or any) webhook URL below.
   Until it is set, the form will tell visitors it is not connected yet,
   so you never lose a lead silently.
   ===================================================================== */
var WEBHOOK_URL = ''; // e.g. 'https://your-n8n-domain/webhook/aurastudio-lead'

/* ---- Security: refuse to run inside someone else's frame (clickjacking) ---- */
if (window.top !== window.self) {
  try { window.top.location.href = window.self.location.href; } catch (e) {}
  document.documentElement.style.display = 'none';
}

/* ---- Theme: apply before first paint ---- */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var theme = 'dark';
  try {
    var saved = localStorage.getItem('aura-theme');
    if (saved === 'light' || saved === 'dark') {
      theme = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 'light';
    }
  } catch (e) {}
  root.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;

  /* ---- Email links (address is assembled here so it is not sitting in the HTML for spam bots) ---- */
  document.querySelectorAll('.email-link').forEach(function (a) {
    var addr = a.getAttribute('data-u') + '@' + a.getAttribute('data-d');
    a.setAttribute('href', 'mailto:' + addr);
    a.setAttribute('aria-label', 'Email ' + addr);
  });

  /* ---- Stagger order (set via script so the page needs no inline styles) ---- */
  document.querySelectorAll('[data-i]').forEach(function (el) {
    el.style.setProperty('--i', el.getAttribute('data-i'));
  });

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Theme toggle ---- */
  var themeBtn = document.getElementById('themeToggle');
  function syncTheme() {
    var dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', String(!dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0C110F' : '#F5F2EB');
  }
  if (themeBtn) {
    syncTheme();
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('aura-theme', next); } catch (e) {}
      syncTheme();
    });
  }

  /* ---- Announcement bar ---- */
  var announce = document.getElementById('announce');
  var announceClose = document.getElementById('announceClose');
  try { if (sessionStorage.getItem('aura-announce') === '1') announce.classList.add('hidden'); } catch (e) {}
  if (announceClose) {
    announceClose.addEventListener('click', function () {
      announce.classList.add('hidden');
      try { sessionStorage.setItem('aura-announce', '1'); } catch (e) {}
    });
  }

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  function closeMenu() {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* ---- Services dropdown ---- */
  var dd = document.querySelector('.has-dropdown');
  var ddBtn = dd.querySelector('.dropdown-toggle');
  function setDropdown(open) {
    dd.classList.toggle('open', open);
    ddBtn.setAttribute('aria-expanded', String(open));
  }
  ddBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setDropdown(!dd.classList.contains('open'));
  });
  dd.querySelectorAll('.dropdown a').forEach(function (a) {
    a.addEventListener('click', function () { setDropdown(false); });
  });
  document.addEventListener('click', function (e) { if (!dd.contains(e.target)) setDropdown(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setDropdown(false); closeMenu(); }
  });

  /* ---- FAQ accordion (one open at a time) ---- */
  var questions = document.querySelectorAll('.acc-q');
  function collapse(btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.parentElement.nextElementSibling.style.maxHeight = null;
  }
  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      questions.forEach(collapse);
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        var panel = btn.parentElement.nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---- Scroll reveal ---- */
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- Active nav link while scrolling ---- */
  var links = {};
  document.querySelectorAll('.nav-list > li > a.nav-link').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && links[entry.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          links[entry.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* ---- Lead form: validation, spam protection, webhook ---- */
  var form = document.getElementById('leadForm');
  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');
  var honeypot = document.getElementById('hpField');
  var loadedAt = Date.now();
  var MIN_FILL_MS = 3000;   // submitted faster than this = almost certainly a bot
  var COOLDOWN_MS = 30000;  // one message per 30 seconds per browser

  function clean(value, max) {
    // strip control characters, trim, and enforce a length limit
    return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
  }

  var fields = {
    name:    { el: document.getElementById('name'),    err: document.getElementById('nameError'),    test: function (v) { return v ? '' : 'Please enter your name.'; } },
    email:   { el: document.getElementById('email'),   err: document.getElementById('emailError'),   test: function (v) {
      if (!v) return 'Please enter your email.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.';
    } },
    role:    { el: document.getElementById('role'),    err: document.getElementById('roleError'),    test: function (v) { return v ? '' : 'Please choose one.'; } },
    message: { el: document.getElementById('message'), err: document.getElementById('messageError'), test: function (v) {
      if (!v) return 'Please tell me what you would like to automate.';
      return v.length >= 10 ? '' : 'A little more detail helps (10+ characters).';
    } }
  };

  function validate(key) {
    var f = fields[key];
    var msg = f.test(f.el.value.trim());
    f.err.textContent = msg;
    f.el.closest('.field').classList.toggle('invalid', !!msg);
    return !msg;
  }
  Object.keys(fields).forEach(function (key) {
    fields[key].el.addEventListener('blur', function () { validate(key); });
    fields[key].el.addEventListener('input', function () {
      if (fields[key].el.closest('.field').classList.contains('invalid')) validate(key);
    });
  });

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setStatus('', '');
    var ok = Object.keys(fields).map(validate).every(Boolean);
    if (!ok) return;

    // Honeypot: real visitors never see this field, bots fill it. Pretend it worked, send nothing.
    if (honeypot && honeypot.value) {
      setStatus('Thanks! Your message is in.', 'ok');
      form.reset();
      return;
    }
    if (Date.now() - loadedAt < MIN_FILL_MS) {
      setStatus('Please wait a moment and try again.', 'err');
      return;
    }
    var last = 0;
    try { last = parseInt(localStorage.getItem('aura-last-submit') || '0', 10) || 0; } catch (err) {}
    if (Date.now() - last < COOLDOWN_MS) {
      setStatus('Please wait a little before sending another message.', 'err');
      return;
    }
    if (WEBHOOK_URL.indexOf('https://') !== 0) {
      setStatus('This form is not connected yet. Please email or message me on LinkedIn instead.', 'err');
      return;
    }

    var payload = {
      name: clean(fields.name.el.value, 80),
      email: clean(fields.email.el.value, 120),
      role: clean(fields.role.el.value, 40),
      message: clean(fields.message.el.value, 2000),
      source: 'aurastudio-site',
      submittedAt: new Date().toISOString()
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error('Request failed');
      try { localStorage.setItem('aura-last-submit', String(Date.now())); } catch (err) {}
      setStatus('Thanks, ' + payload.name + '! Your message is in and you will hear back by email.', 'ok');
      form.reset();
    }).catch(function () {
      setStatus('Something went wrong sending your message. Please try again, or email or message me on LinkedIn.', 'err');
    }).then(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    });
  });
});
