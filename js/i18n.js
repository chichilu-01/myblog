/* ---------------------------------------------------------------
   i18n.js — tiny translation engine
   - English is the default language.
   - Vietnamese (vi) and Japanese (ja) are chosen with the header buttons.
   - The choice is remembered in localStorage.

   Markup hooks (English text is already written in the HTML, so the
   page still reads correctly before/without JavaScript):
     data-i18n="key"           -> replaces textContent
     data-i18n-html="key"      -> replaces innerHTML (for <strong>, <br>)
     data-i18n-alt / -title / -aria / -placeholder="key" -> attributes
     data-date="YYYY-MM-DD"    -> formatted for the current language
--------------------------------------------------------------- */
(function () {
  var DATA = window.I18N_DATA || {};
  var LANGS = ['en', 'vi', 'ja'];
  var LOCALES = { en: 'en-US', vi: 'vi-VN', ja: 'ja-JP' };

  function readStored() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }

  var lang = LANGS.indexOf(readStored()) > -1 ? readStored() : 'en';

  function t(key) {
    var d = DATA[lang] || {};
    if (key in d) return d[key];
    var base = DATA.en || {};
    return key in base ? base[key] : key;
  }

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    try {
      return d.toLocaleDateString(LOCALES[lang], { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function each(root, selector, fn) {
    Array.prototype.forEach.call(root.querySelectorAll(selector), fn);
  }

  function apply(root) {
    root = root || document;
    document.documentElement.lang = lang;

    each(root, '[data-i18n]', function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    each(root, '[data-i18n-html]', function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });

    [['alt', 'alt'], ['title', 'title'], ['aria', 'aria-label'], ['placeholder', 'placeholder']].forEach(function (pair) {
      each(root, '[data-i18n-' + pair[0] + ']', function (el) {
        el.setAttribute(pair[1], t(el.getAttribute('data-i18n-' + pair[0])));
      });
    });

    each(root, '[data-date]', function (el) { el.textContent = formatDate(el.getAttribute('data-date')); });

    each(root, '.lang-btn', function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function setLang(next) {
    if (LANGS.indexOf(next) === -1 || next === lang) return;
    lang = next;
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage may be blocked */ }
    apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  window.I18N = {
    t: t,
    apply: apply,
    setLang: setLang,
    get lang() { return lang; }
  };
})();
