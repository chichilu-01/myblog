/* pages.js — blog search + filters, gallery lightbox, reading progress/time, share, contact form */
document.addEventListener('DOMContentLoaded', function () {
  var T = function (k) { return window.I18N.t(k); };
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  // diacritic-insensitive text for searching (works for Vietnamese too)
  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  }

  // ---- Category filters (+ search on the blog page) ----
  var bar = document.querySelector('.filters');
  if (bar) {
    var items = document.querySelectorAll('[data-cat]');
    var empty = document.querySelector('.empty-note');
    var search = document.getElementById('blog-search');
    var current = 'all';

    var apply = function () {
      var q = search ? norm(search.value.trim()) : '';
      var visible = 0;
      each(items, function (el) {
        var okCat = current === 'all' || el.getAttribute('data-cat') === current;
        var okQ = !q || norm(el.textContent).indexOf(q) > -1;
        el.hidden = !(okCat && okQ);
        if (!el.hidden) visible++;
      });
      if (empty) empty.style.display = visible ? 'none' : 'block';
    };

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      current = btn.getAttribute('data-filter');
      each(bar.querySelectorAll('.filter-btn'), function (b) { b.classList.toggle('active', b === btn); });
      apply();
    });
    if (search) search.addEventListener('input', apply);
    document.addEventListener('langchange', apply);
  }

  // ---- Gallery lightbox: arrows, keyboard, swipe ----
  var box = document.getElementById('lightbox');
  if (box) {
    var img = box.querySelector('img');
    var cap = box.querySelector('.lightbox-caption');
    var count = box.querySelector('.lightbox-count');
    var list = [];
    var idx = 0;

    var show = function (i) {
      idx = (i + list.length) % list.length;
      var btn = list[idx];
      var thumb = btn.querySelector('img');
      img.src = btn.getAttribute('data-full');
      img.alt = thumb.alt;
      cap.textContent = thumb.alt;
      count.textContent = (idx + 1) + ' / ' + list.length;
    };
    var close = function () { box.hidden = true; img.src = ''; document.body.classList.remove('no-scroll'); };

    document.getElementById('gallery-grid').addEventListener('click', function (e) {
      var btn = e.target.closest('.gallery-open');
      if (!btn) return;
      list = [];
      each(document.querySelectorAll('.gallery-item'), function (f) { if (!f.hidden) list.push(f.querySelector('.gallery-open')); });
      box.hidden = false;
      document.body.classList.add('no-scroll');
      show(list.indexOf(btn));
      box.querySelector('.lightbox-close').focus();
    });

    box.addEventListener('click', function (e) {
      if (e.target.closest('.lightbox-close')) return close();
      if (e.target.closest('.prev')) return show(idx - 1);
      if (e.target.closest('.next')) return show(idx + 1);
      if (e.target !== img) close();
    });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    var x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  // ---- Post pages: reading progress bar + reading time ----
  var article = document.querySelector('.premium-post');
  if (article) {
    var prog = document.createElement('div');
    prog.className = 'read-progress';
    document.body.appendChild(prog);
    var update = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      prog.style.width = (max > 0 ? Math.min(100, h.scrollTop / max * 100) : 0) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();

    var meta = document.querySelector('.post-meta');
    var rt = document.createElement('span');
    rt.className = 'reading-time';
    if (meta) meta.appendChild(rt);
    var paintRT = function () {
      var text = article.innerText || '';
      var n = window.I18N.lang === 'ja'
        ? text.replace(/\s/g, '').length / 450
        : text.trim().split(/\s+/).length / 200;
      n = Math.max(1, Math.round(n));
      rt.innerHTML = '<i class="fa-regular fa-clock" aria-hidden="true"></i> ' + T('post.read').replace('{n}', n);
    };
    paintRT();
    document.addEventListener('langchange', paintRT);
  }

  // ---- Copy link ----
  var share = document.getElementById('share-btn');
  if (share) {
    share.addEventListener('click', function () {
      var label = share.querySelector('span');
      var done = function () {
        label.textContent = T('share.done');
        setTimeout(function () { label.textContent = T('share.copy'); }, 1800);
      };
      var fallback = function () {
        var ta = document.createElement('textarea');
        ta.value = location.href;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(location.href).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  // ---- Contact form: opens the visitor's email app ----
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('c-name').value.trim();
      var subject = document.getElementById('c-subject').value.trim();
      var message = document.getElementById('c-message').value.trim();
      location.href = 'mailto:hoangminhphuong270401@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(message + '\n\n— ' + name);
    });
  }
});
