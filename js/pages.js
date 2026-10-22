/* pages.js — blog/gallery category filters, gallery lightbox, contact form */
document.addEventListener('DOMContentLoaded', function () {

  // ---- Category filters (blog + gallery) ----
  var filterBar = document.querySelector('.filters');
  if (filterBar) {
    var items = document.querySelectorAll('[data-cat]');
    var empty = document.querySelector('.empty-note');
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      var f = btn.getAttribute('data-filter');
      Array.prototype.forEach.call(filterBar.querySelectorAll('.filter-btn'), function (b) {
        b.classList.toggle('active', b === btn);
      });
      var visible = 0;
      Array.prototype.forEach.call(items, function (el) {
        var show = f === 'all' || el.getAttribute('data-cat') === f;
        el.hidden = !show;
        if (show) visible++;
      });
      if (empty) empty.style.display = visible ? 'none' : 'block';
    });
  }

  // ---- Gallery lightbox ----
  var box = document.getElementById('lightbox');
  if (box) {
    var boxImg = box.querySelector('img');
    var boxCap = box.querySelector('.lightbox-caption');
    var close = function () { box.hidden = true; boxImg.src = ''; document.body.classList.remove('no-scroll'); };

    document.getElementById('gallery-grid').addEventListener('click', function (e) {
      var btn = e.target.closest('.gallery-open');
      if (!btn) return;
      var thumb = btn.querySelector('img');
      boxImg.src = btn.getAttribute('data-full');
      boxImg.alt = thumb.alt;
      boxCap.textContent = thumb.alt;
      box.hidden = false;
      document.body.classList.add('no-scroll');
      box.querySelector('.lightbox-close').focus();
    });
    box.addEventListener('click', function (e) { if (e.target !== boxImg) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
  }

  // ---- Contact form: opens the visitor's email app ----
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('c-name').value.trim();
      var subject = document.getElementById('c-subject').value.trim();
      var message = document.getElementById('c-message').value.trim();
      var body = message + '\n\n— ' + name;
      location.href = 'mailto:hoangminhphuong270401@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
});
