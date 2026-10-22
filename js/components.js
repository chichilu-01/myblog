/* components.js — shared header, footer, language buttons, mobile menu */
(function () {
  // Site root, derived from where this script is loaded (works on GitHub Pages
  // under /myblog/ as well as locally).
  var ROOT = new URL('../', document.currentScript.src).href;

  var NAV = [
    { key: 'nav.home', label: 'Home', href: 'index.html', icon: 'fa-house' },
    { key: 'nav.blog', label: 'Blog', href: 'blog/blog.html', icon: 'fa-book-open' },
    { key: 'nav.projects', label: 'Projects', href: 'projects/projects.html', icon: 'fa-laptop-code' },
    { key: 'nav.gallery', label: 'Gallery', href: 'gallery/gallery.html', icon: 'fa-images' },
    { key: 'nav.about', label: 'About', href: 'about/about.html', icon: 'fa-user' },
    { key: 'nav.contact', label: 'Contact', href: 'contact/contact.html', icon: 'fa-envelope' },
    { key: 'nav.cv', label: 'Résumé', href: 'cv/cv.html', icon: 'fa-file-lines', highlight: true }
  ];

  function isCurrent(href) {
    var path = location.pathname;
    if (href === 'index.html') return /\/$|\/index\.html$/.test(path);
    if (href === 'blog/blog.html') return path.indexOf('/blog/') > -1 || path.indexOf('/post/') > -1;
    return path.indexOf('/' + href) > -1;
  }

  function build() {
    var nav = NAV.map(function (n) {
      var cls = (n.highlight ? 'btn-highlight ' : '') + (isCurrent(n.href) ? 'current' : '');
      return '<a href="' + ROOT + n.href + '" class="' + cls.trim() + '"' + (isCurrent(n.href) ? ' aria-current="page"' : '') + '>' +
        '<i class="fa-solid ' + n.icon + '" aria-hidden="true"></i> <span data-i18n="' + n.key + '">' + n.label + '</span></a>';
    }).join('');

    var header =
      '<header class="site-header"><div class="container header-content">' +
      '<div class="logo"><a href="' + ROOT + 'index.html"><span class="seal">HP</span>' +
      '<span class="brand-text" data-i18n="brand">Phuong\'s Blog</span></a></div>' +
      '<nav class="main-nav" id="main-nav">' + nav + '</nav>' +
      '<div class="lang-switch" role="group" aria-label="Language" data-i18n-aria="lang.label">' +
      '<button type="button" class="lang-btn" data-lang="en" lang="en" title="English">EN</button>' +
      '<button type="button" class="lang-btn" data-lang="vi" lang="vi" title="Tiếng Việt">VI</button>' +
      '<button type="button" class="lang-btn" data-lang="ja" lang="ja" title="日本語">日本語</button>' +
      '</div>' +
      '<button type="button" class="mobile-menu-btn" aria-label="Menu" aria-controls="main-nav" aria-expanded="false" data-i18n-aria="menu.open">' +
      '<i class="fa-solid fa-bars"></i></button>' +
      '</div></header>';

    var footer =
      '<footer><div class="container footer-content">' +
      '<div class="footer-col"><h3>Hoang Minh Phuong</h3><p data-i18n="footer.desc">A personal blog about programming, cooking and everyday life.</p></div>' +
      '<div class="footer-col"><h3 data-i18n="footer.contact">Contact</h3><ul class="contact-info">' +
      '<li><i class="fa-solid fa-envelope"></i> hoangminhphuong270401@gmail.com</li>' +
      '<li><i class="fa-solid fa-phone"></i> 080-5826-4308</li></ul></div>' +
      '<div class="footer-col"><h3 data-i18n="footer.connect">Connect</h3><div class="social-links">' +
      '<a href="#" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>' +
      '<a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>' +
      '<a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a></div></div>' +
      '</div><div class="footer-bottom"><p>&copy; <span id="year"></span> HOANG MINH PHUONG. ' +
      '<span data-i18n="footer.rights">All rights reserved.</span></p></div></footer>';

    var h = document.getElementById('header');
    var f = document.getElementById('footer');
    if (h) h.innerHTML = header;
    if (f) f.innerHTML = footer;
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function wire() {
    Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (b) {
      b.addEventListener('click', function () { window.I18N.setLang(b.getAttribute('data-lang')); });
    });

    var btn = document.querySelector('.mobile-menu-btn');
    var nav = document.querySelector('.main-nav');
    if (!btn || !nav) return;
    var icon = btn.querySelector('i');

    function setOpen(open) {
      nav.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!nav.classList.contains('active')); });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    build();
    wire();
    window.I18N.apply();
  });
})();
