// Common script.
// Generates the shared header/footer and controls menus, reveal animations, forms, and maps.

const rawPathParts = window.location.pathname.split('/').filter(Boolean);
const projectRootName = 'https-www-ones-house-co-jp';
const projectRootIndex = rawPathParts.lastIndexOf(projectRootName);
const pathParts = projectRootIndex >= 0 ? rawPathParts.slice(projectRootIndex + 1) : rawPathParts;
const filePart = pathParts[pathParts.length - 1] || 'index.html';
const isFile = /\.[a-z0-9]+$/i.test(filePart);
const directoryParts = isFile ? pathParts.slice(0, -1) : pathParts;
const basePath = directoryParts.length ? '../'.repeat(directoryParts.length) : '';
const isEnglishDocument = document.documentElement.lang.toLowerCase().startsWith('en');
const isEnglishPage = directoryParts[0] === 'en' || isEnglishDocument;
const pagePath = (isFile ? pathParts : [...pathParts, 'index.html']).join('/');
const japanesePath = isEnglishPage ? pagePath.replace(/^en\//, '') : pagePath;
const englishPath = isEnglishPage ? pagePath : `en/${pagePath || 'index.html'}`;
const japaneseHref = basePath + (japanesePath || 'index.html');
const englishHref = basePath + englishPath;

const nav = isEnglishPage ? {
  aria: 'Primary navigation', home: 'Home', business: 'Business', control: 'Control Systems', work: 'Business Systems', accession: 'Contract Development', operation: 'Operation Support', company: 'Company', policy: 'Philosophy', greeting: 'Message', access: 'Access', achievement: 'Projects', recruit: 'Careers', flow: 'Selection Flow', newGrad: 'New Graduates', career: 'Career Hiring', newForm: 'New Graduate Entry', careerForm: 'Career Entry', language: 'Language', vietnamese: 'Tiếng Việt', vietnameseDesc: 'Company Profile', contact: 'Contact', sitemap: 'Sitemap', security: 'Information Security Policy', privacy: 'Privacy Policy', contactMail: 'Contact: info@ones-house.co.jp', phone: 'Head Office TEL: 052-602-7727', footerAria: 'Footer navigation'
} : {
  aria: '主要ナビゲーション', home: 'ホーム', business: '事業案内', control: '制御系', work: '業務系', accession: '一括受託開発', operation: '運用系', company: '会社概要', policy: '企業理念', greeting: '代表者挨拶', access: 'アクセスマップ', achievement: '実績紹介', recruit: '採用情報', flow: '選考までの流れ', newGrad: '新卒採用', career: 'キャリア採用', newForm: '新卒エントリーフォーム', careerForm: 'キャリアエントリーフォーム', language: 'Language', english: 'English', japanese: '日本語', vietnamese: 'Tiếng Việt', vietnameseDesc: '会社案内', contact: 'お問い合わせ', sitemap: 'サイトマップ', security: '情報セキュリティ方針', privacy: '個人情報保護方針', contactMail: 'お問い合わせ先: info@ones-house.co.jp', phone: '本社電話番号：052-602-7727', footerAria: 'フッターナビゲーション'
};

const routeBase = isEnglishPage ? `${basePath}en/` : basePath;

const headerMarkup = `
<header class="site-header">

  <div class="header-tools">
    <div id="PC_changeFontSize">
      <ul class="changeFontSize">
        <li class="changeFontSize__label">文字サイズ</li>
        <li>
          <span tabindex="0" class="changeFontSize__button active"
          onclick="changeFontSize(1.0,event)"
          onkeydown="changeFontSize_handleKey(1.0,event)" data-fs="1.0">
          小
          </span>
        </li>
        <li>
          <span tabindex="0" class="changeFontSize__button"
          onclick="changeFontSize(1.5,event)"
          onkeydown="changeFontSize_handleKey(1.5,event)" data-fs="1.5">
          中
          </span>
        </li>
        <li>
          <span tabindex="0" class="changeFontSize__button"
          onclick="changeFontSize(2.0,event)"
          onkeydown="changeFontSize_handleKey(2.0,event)" data-fs="2.0">
          大
          </span>
        </li>
      </ul>
    </div>
    <!-- Language追加 -->
    <div class="header-language">
      <span>Language▾</span>
      <div class="header-language-menu">
        <a href="#" onclick="backToJapanese();return false;">日本語</a>
        <a href="#" onclick="translateToEnglish();return false;">English</a>
        <a href="#" onclick="translateToKorean();return false;">한국어</a>
        <a href="#" onclick="translateToChinese();return false;">中文</a>
        <a href="#" onclick="translateToVietnamese();return false;">Tiếng Việt</a>
        <a href="#" onclick="translateToNepali();return false;">नेपाली</a>
        <a href="#" onclick="translateToPortuguese();return false;">Português</a>
        <a href="#" onclick="translateToFrench();return false;">Français</a>
      </div>
    </div>
  </div>

    <nav class="nav" aria-label="${nav.aria}">
      <a class="brand" href="${routeBase}test/index.html"><img src="${basePath}test/assets/images/logo1.png" alt="One's House"></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
        <span class="nav-toggle-icon" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="nav-toggle-label">Menu</span>
      </button>
      <div class="nav-menu" id="nav-menu">

      <div class="nav-item">
        <div id="MB_changeFontSize">
          <ul class="changeFontSize">
            <li class="changeFontSize__label">文字サイズ</li>
            <li>
              <span tabindex="0" class="changeFontSize__button active" onclick="changeFontSize(1.0, event)" onkeydown="changeFontSize_handleKey(1.0,event)" data-fs="1.0">小</span>
            </li>
            <li>
              <span tabindex="0" class="changeFontSize__button" onclick="changeFontSize(1.5, event)" onkeydown="changeFontSize_handleKey(1.5,event)" data-fs="1.5">中</span>
            </li>
            <li>
              <span tabindex="0" class="changeFontSize__button" onclick="changeFontSize(2.0, event)" onkeydown="changeFontSize_handleKey(2.0,event)" data-fs="2.0">大</span>
            </li>
          </ul>
        </div>
      </div>

        <div class="nav-item nav-language-item">
          <p>${nav.language}</p>
            <div class="dropdown dropdown-right">
              <a class="lang-google" href="#" onclick="backToJapanese(); return false;">日本語</a>
              <a class="lang-google" href="#" onclick="translateToEnglish(); return false;">English</a>
              <a class="lang-google" href="#" onclick="translateToKorean(); return false;">한국어</a>
              <a class="lang-google" href="#" onclick="translateToChinese(); return false;">中文</a>
              <a class="lang-google" href="#" onclick="translateToVietnamese(); return false;">Tiếng Việt</a>
              <a class="lang-google" href="#" onclick="translateToNepali(); return false;">नेपाली</a>
              <a class="lang-google" href="#" onclick="translateToPortuguese(); return false;">Português</a>
              <a class="lang-google" href="#" onclick="translateToFrench(); return false;">Français</a>
            </div>
          </div>

        <div class="nav-item">
          <p class="nav-home">${nav.home}</p>
        </div>

        <div class="nav-item">
          <p>${nav.business}</p>
          <div class="dropdown">
            <a href="${routeBase}test/business/business.html">${nav.business}</a>
            <a href="${routeBase}test/business/control.html">${nav.control}</a>
            <a href="${routeBase}test/business/work.html">${nav.work}</a>
            <a href="${routeBase}test/business/accession.html">${nav.accession}</a>
            <a href="${routeBase}test/business/operation.html">${nav.operation}</a>
          </div>
        </div>

        <div class="nav-item">
          <p class="nav-achievement">
          ${nav.achievement}
          </p>
        </div>

        <div class="nav-item">
          <p>${nav.company}</p>
          <div class="dropdown">
            <a href="${routeBase}test/company/company.html">${nav.company}</a>
            <a href="${routeBase}test/company/policy.html">${nav.policy}</a>
            <a href="${routeBase}test/company/greeting.html">${nav.greeting}</a>
            <a href="${routeBase}test/company/access.html">${nav.access}</a>
          </div>
        </div>

        <div class="nav-item">
          <p>${nav.recruit}</p>
          <div class="dropdown">
            <a href="${routeBase}test/recruit/recruit.html">${nav.recruit}</a>
            <a href="${routeBase}test/recruit/recruit.html#flow">${nav.flow}</a>
            <a href="${routeBase}test/recruit/recruit.html?tab=new#recruit-top">${nav.newGrad}</a>
            <a href="${routeBase}test/recruit/recruit.html?tab=career#recruit-top">${nav.career}</a>
            <a href="${routeBase}test/recruit/contact_new.html">${nav.newForm}</a>
            <a href="${routeBase}test/recruit/contact_career.html">${nav.careerForm}</a>
          </div>
        </div>
       <div class="nav-item">
        <p class="nav-contact">
          ${nav.contact}
        </p>
      </div>

        </div>
      </div>
    </nav>
  </header>
`;

const footerMarkup = `
  <footer class="footer">
    <nav aria-label="${nav.footerAria}">
      <a href="${routeBase}test/contact/sitemap.html">${nav.sitemap}</a>
      <a href="${routeBase}test/contact/security.html">${nav.security}</a>
      <a href="${routeBase}test/contact/privacy.html">${nav.privacy}</a>
    </nav>



<div class="footer-line">
  <p class="line-title">公式LINE</p>

  <div class="line-content">
    <a class="line-qr" href="https://lin.ee/xxxxxxxx" target="_blank" rel="noopener">
      <img src="${basePath}assets/images/001.png" alt="One's House公式LINE">
    </a>

    <a class="line-button" href="https://lin.ee/xxxxxxxx" target="_blank" rel="noopener">
      LINEでお問い合わせ
    </a>
  </div>
</div>

    <p>Copyright(C) One's House. All Right Reserved.</p>
  </footer>
`;

const headerTarget = document.querySelector('[data-site-header], .site-header');
if (headerTarget) {
  headerTarget.insertAdjacentHTML('afterend', headerMarkup);
  headerTarget.remove();
}

const footerTarget = document.querySelector('[data-site-footer], .footer');
if (footerTarget) {
  footerTarget.insertAdjacentHTML('afterend', footerMarkup);
  footerTarget.remove();
}

const pageToggle = document.querySelector('.nav-toggle');
const pageMenu = document.querySelector('#nav-menu');
const pageNavItems = document.querySelectorAll('.nav-item');

if (pageToggle && pageMenu) {
  pageToggle.addEventListener('click', () => {
    const expanded = pageToggle.getAttribute('aria-expanded') === 'true';
    const isOpen = !expanded;

    pageToggle.setAttribute('aria-expanded', String(isOpen));
    pageMenu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    const label = pageToggle.querySelector('.nav-toggle-label');
    if (label) {
      label.textContent = isOpen ? 'Close' : 'Menu';
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1120) {
      pageToggle.setAttribute('aria-expanded', 'false');
      pageMenu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      pageNavItems.forEach((item) => item.classList.remove('is-active'));
    }
  }, { passive: true });
}

pageNavItems.forEach((item) => {
  const link = item.querySelector(':scope > p');
  const dropdown = item.querySelector('.dropdown');
  if (!link || !dropdown) return;

  link.addEventListener('click', (event) => {
    if (link.getAttribute('href') === '#') {
      event.preventDefault();
    }
    if (!window.matchMedia('(max-width: 1120px)').matches) return;
    event.preventDefault();
    if (item.classList.contains('is-active')) {
      item.classList.remove('is-active');
      link.blur();
    } else {
      pageNavItems.forEach((other) => other.classList.remove('is-active'));
      item.classList.add('is-active');
    }
  });
});

const contactLink = document.querySelector('.nav-contact');

if (contactLink) {
  contactLink.addEventListener('click', () => {
    window.location.href = `${routeBase}test/contact/contact.html`;
  });
}

const achievementLink = document.querySelector('.nav-achievement');

if (achievementLink) {
  achievementLink.addEventListener('click', () => {
    window.location.href = `${routeBase}test/achievement/achievement.html`;
  });
}

const homeLink = document.querySelector('.nav-home');

if (homeLink) {
  homeLink.addEventListener('click', () => {
    window.location.href = `${routeBase}test/index.html`;
  });
}

document.addEventListener('click', (event) => {
  const isOpen = pageMenu?.classList.contains('is-open');
  if (!isOpen) return;

  const clickedInsideMenu = pageMenu.contains(event.target);
  const clickedToggle = pageToggle.contains(event.target);

  if (clickedInsideMenu || clickedToggle) return;

  pageMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  pageToggle.setAttribute('aria-expanded', 'false');

  const label = pageToggle.querySelector('.nav-toggle-label');
  if (label) label.textContent = 'Menu';
});
const revealTargets = document.querySelectorAll('.section-head, .news-reveal-item, .news-copy, .news-image-link, .news-card, .notice-card, .notice-line-item, .service-grid article, .recruit-band, .location, .contact-band, .sub-hero, .content-card, .data-card, .form-card, .mini-card');
revealTargets.forEach((target) => target.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealTargets.forEach((target) => revealObserver.observe(target));

window.addEventListener('mousemove', (event) => {
  document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
}, { passive: true });

let lastScrollY = window.scrollY;
const updateHeaderTone = () => {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.nav');
  if (!header || !nav) return;
  const rect = nav.getBoundingClientRect();
  const x = Math.min(window.innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
  const y = Math.min(window.innerHeight - 1, Math.max(0, rect.bottom + 8));
  const underHeader = document.elementsFromPoint(x, y)
    .find((element) => !header.contains(element));
  const isOnDarkArea = Boolean(underHeader?.closest('.hero, .sub-hero, .recruit-band'));
  document.body.classList.toggle('header-on-light', !isOnDarkArea);
};
updateHeaderTone();
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const isMenuOpen = pageMenu?.classList.contains('is-open');
  const isNearTop = currentScrollY <= 12;
  const isScrollingUp = currentScrollY < lastScrollY;

  document.body.classList.toggle('is-scrolled', !isNearTop);
  document.body.classList.toggle('header-hidden', !isNearTop && !isScrollingUp && !isMenuOpen);
  document.body.classList.toggle('header-revealed', !isNearTop && isScrollingUp);
  updateHeaderTone();

  lastScrollY = Math.max(currentScrollY, 0);
}, { passive: true });

/*const localFormPreview = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
document.querySelectorAll('form[action$="mail.php"], form[action$="sendmail.php"]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    if (!localFormPreview) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const existingMessage = form.querySelector('.form-status');
    if (existingMessage) existingMessage.remove();
    const message = document.createElement('p');
    message.className = 'form-status';
    message.textContent = isEnglishPage
      ? 'This is a local test environment, so the message was not sent to the company. On the production PHP server, contact/mail.php will send it.'
      : 'テスト環境のため、会社宛には送信していません。本番PHPサーバーでは contact/mail.php から送信されます。';
    form.querySelector('.form-actions')?.before(message);
  });
});*/

const internalLinks = document.querySelectorAll('a[href^="#"], a[href*=".html#"]');
internalLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || !href.includes('#')) return;
    const [path, hash] = href.split('#');
    const currentPath = window.location.pathname.split('/').pop();
    const linkPath = path.split('/').pop();
    if (path && linkPath && linkPath !== currentPath) return;
    const target = document.getElementById(hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

window.addEventListener('load', () => {
  document.querySelectorAll('.map-wrap iframe').forEach((iframe) => {
    const src = iframe.getAttribute('src');
    if (!src) return;
    window.setTimeout(() => {
      iframe.setAttribute('src', src);
    }, 150);
  });
});





const curtains = document.querySelectorAll(".curtain");

const states = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

curtains.forEach(() => {
  states.push({
    angle: random(0, Math.PI * 2),

    targetAngle: random(0, Math.PI * 2),

    radiusX: random(40, 100),
    radiusY: random(20, 60),

    offset: random(0, 1000)
  });
});

setInterval(() => {
  states.forEach(state => {
    state.targetAngle += random(-1, 1);
  });
}, 4000);

function animate() {

  const time = performance.now() * 0.00015;

  states.forEach((state, index) => {

    // 向きだけゆっくり変える
    state.angle += (state.targetAngle - state.angle) * 0.01;

    const x =
      Math.cos(time + state.offset + state.angle) *
      state.radiusX;

    const y =
      Math.sin(time * 0.8 + state.offset + state.angle) *
      state.radiusY;

    const r =
      Math.sin(time * 0.5 + state.offset) * 2;

    curtains[index].style.transform = `
      translate(${x}px, ${y}px)
      rotate(${r}deg)
    `;
  });

  requestAnimationFrame(animate);
}

animate();

function translateTo(lang) {
  const currentHost = window.location.hostname;

// ★Google翻訳の中にいる場合
  if (currentHost.includes("translate.goog")) {
    // 1. セッションに次の言語を確実に保存（遷移後の自動維持のため）
    sessionStorage.setItem("siteLanguage", lang);

    // 2. 現在の Google翻訳のURL（例: https://example-com.translate.goog/... ）を取得
    const currentUrl = new URL(window.location.href);

    // 3. URLパラメーターの「tl（翻訳先言語）」を新しい言語コードに直接上書きする
    // これにより、元のドメイン（cleanHost）に一度も戻らず、URLも一切見えません。
    currentUrl.searchParams.set("tl", lang);

    // 4. Google翻訳のドメインのまま直接ジャンプ
    window.top.location.href = currentUrl.toString();
    return;
  }

  // 最初から通常ドメインにいる場合は、そのままセッションを上書きして翻訳
  sessionStorage.removeItem("siteLanguage");
  sessionStorage.setItem("siteLanguage", lang);
  const cleanUrl = window.location.origin + window.location.pathname;
  const translateUrl = `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(cleanUrl)}`;
  window.location.href = translateUrl;
}
// 各言語のトリガー関数（既存のHTML側のonclick等はそのまま使えます）
function translateToEnglish()    { translateTo("en"); }
function translateToKorean()     { translateTo("ko"); }
function translateToChinese()    { translateTo("zh-CN"); }
function translateToVietnamese() { translateTo("vi"); }
function translateToNepali()     { translateTo("ne"); }
function translateToPortuguese() { translateTo("pt"); }
function translateToFrench()     { translateTo("fr"); }

// ==========================================
// 2. 日本語に戻す処理
// ==========================================
function backToJapanese() {
  // Google翻訳内（セッション分離状態）のキーも念のため削除
  sessionStorage.removeItem("siteLanguage");

  const currentHost = window.location.hostname;

  // Google翻訳ドメイン（*.translate.goog）内にいる場合の復元処理
  if (currentHost.includes("translate.goog")) {
    let cleanHost = currentHost.split(".translate.goog")[0];

    // ドメインの復元（-- を - に、- を . に戻す）
    cleanHost = cleanHost
      .replace(/--/g, "___HYPHEN___")
      .replace(/-/g, ".")
      .replace(/___HYPHEN___/g, "-");

    // ★日本語に戻る際、URLパラメータに「resetLang=true」を付与してリダイレクトする
    const originalUrl = window.location.protocol + "//" + cleanHost + window.location.pathname + "?resetLang=true";
    window.location.href = originalUrl;
    return;
  }

  // 通常ドメインにいる場合
  window.location.href = window.location.origin + window.location.pathname;
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const resetLang = urlParams.get("resetLang");
  const nextLang = urlParams.get("nextLang"); // ★新しく追加：次の言語

  // 日本語に戻るボタン、または他言語切り替え経由で戻ってきた場合
  if (resetLang === "true") {
    // 1. まず元のサイトの古いセッションを完全に削除
    sessionStorage.removeItem("siteLanguage");
    
    // 2. もし「新しい別の言語」が指定されている場合、それを確実に新しく保存して翻訳へジャンプ
    if (nextLang) {
      sessionStorage.setItem("siteLanguage", nextLang);
      const cleanUrl = window.location.origin + window.location.pathname;
      const translateUrl = `https://translate.google.com/translate?sl=ja&tl=${nextLang}&u=${encodeURIComponent(cleanUrl)}`;
      window.location.href = translateUrl;
      return;
    }

    // 3. 次の言語指定がない（単に日本語に戻るだけ）なら終了
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
    return;
  }

  // --- これ以降は通常の自動翻訳判定（変更なし） ---
  const lang = sessionStorage.getItem("siteLanguage");
  if (!lang) return;

  const noTranslatePages = [
    "/test/contact/contact.html",
    "/test/recruit/contact_new.html",
    "/test/recruit/contact_career.html"
  ];
  if (noTranslatePages.includes(window.location.pathname)) {
    //sessionStorage.removeItem("siteLanguage");
    return;
  }

  if (location.hostname.includes("translate.goog")) {
    return;
  }

  const cleanUrl = window.location.origin + window.location.pathname;
  const translateUrl = `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(cleanUrl)}`;
  window.location.href = translateUrl;
});


// ======================================
// 文字サイズ変更
// ======================================
function changeFontSize(size, event) {
  // クリック対象確認
  const button = event.currentTarget || event.target.closest('.changeFontSize__button');
  if (!button) return;
  // 全ボタンのactiveを解除
  document.querySelectorAll('.changeFontSize__button').forEach(btn => {
    btn.classList.remove('active');
  });
  // PC・モバイル両方の同じサイズをactive
  document.querySelectorAll(
    `.changeFontSize__button`
  ).forEach(btn => {
    if (parseFloat(btn.dataset.fs) === size) {
      btn.classList.add('active');
    }
  });
  // 文字サイズ変更
  document.body.style.fontSize =
    size === 1.0 ? '16px' :
      size === 1.5 ? '24px' :
        '32px';
  // 選択サイズを保存
  localStorage.setItem("fontSize", size);
  console.log("文字サイズを " + size + " に変更しました");
}
// ======================================
// キーボード操作
// ======================================
function changeFontSize_handleKey(size, event) {
  // Enter または Space
  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault();
    changeFontSize(size, event);
  }
}
// ======================================
// 保存したサイズを復元
// ======================================
function restoreFontSize() {
  // 保存データ取得
  let savedSize = localStorage.getItem("fontSize");
  // 初回は小
  if (!savedSize) {
    savedSize = "1.0";
    localStorage.setItem("fontSize", savedSize);
  }
  const size = parseFloat(savedSize);
  // 文字サイズ復元
  document.body.style.fontSize =
    size === 1.0 ? '16px' :
      size === 1.5 ? '24px' :
        '32px';
  // 全active解除
  document.querySelectorAll('.changeFontSize__button').forEach(btn => {
    btn.classList.remove('active');
  });
  // PC・モバイル両方へactive設定
  document.querySelectorAll('.changeFontSize__button').forEach(btn => {
    if (parseFloat(btn.dataset.fs) === size) {
      btn.classList.add('active');
    }
  });
}
// ======================================
// 初回表示
// ======================================
window.addEventListener("load", function () {
  restoreFontSize();
});
// ======================================
// 画面サイズ変更時
// PC ⇔ モバイル切替対応
// ======================================
window.addEventListener("resize", function () {
  restoreFontSize();
});



//ページTOP遷移
document.body.insertAdjacentHTML('beforeend', `
  <button class="back-to-top" aria-label="ページの先頭へ">
    ▲
  </button>
`);
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// News&Topicsへスクロールするボタン
document.body.insertAdjacentHTML('beforeend', `
  <button class="scroll-to-news" aria-label="News&Topicsへ">
    ▼
  </button>
`);


const scrollToNews = document.querySelector('.scroll-to-news');


scrollToNews.addEventListener('click', () => {

  const newsSection = document.querySelector('#news-section');

  if (newsSection) {

    newsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }

});


document.addEventListener('DOMContentLoaded', () => {
  // 【修正点】querySelector から querySelectorAll に変更し、両方のラベルをすべて取得する
  const labels = document.querySelectorAll('.changeFontSize__label');
  if (labels.length === 0) return;

  const updateColor = () => {
    // bodyに「header-on-light」がついているかチェック
    const isLight = document.body.classList.contains('header-on-light');

    // 取得したすべてのラベル（PC用・モバイル用）に対してループ処理を行う
    labels.forEach(label => {
      if (isLight) {
        label.classList.add('is-dark');    // ナビ黒 → 文字サイズ黒
      } else {
        label.classList.remove('is-dark'); // ナビ白 → 文字サイズ白
      }
    });
  };

  // 初期反映
  updateColor();

  // body class 変更に追従
  const observer = new MutationObserver(updateColor);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
});

// 対象の要素を取得
const pcLanguageBox = document.querySelector('.header-language');
const spLanguageItem = document.querySelector('.nav-language-item');

// 非活性（無効化）にしたい対象ページのパスリスト
const disabledPages = [
  "contact.html",
  "contact_new.html",
  "contact_career.html"
];

// 現在のページのパスを取得して判定
const currentPath = window.location.pathname;
const isTargetPage = disabledPages.some(pagePath => currentPath.endsWith(pagePath));

if (isTargetPage) {
  // -----------------------------------------
  // 【対象ページの場合】非活性（無効化）処理
  // -----------------------------------------
  
  // PC用ボタンの非活性化
  if (pcLanguageBox) {
    const pcButton = pcLanguageBox.querySelector('span');
    if (pcButton) pcButton.classList.add('disabled');
  }

  // スマホ用ボタンの非活性化
  if (spLanguageItem) {
    spLanguageItem.classList.add('disabled');
  }

  console.log('Language buttons (PC & Mobile) are disabled on this page.');

} else {
  // -----------------------------------------
  // 【対象ページ以外の場合】通常のクリックイベント登録
  // -----------------------------------------
  
  // PC用の開閉イベント
  if (pcLanguageBox) {
    const pcButton = pcLanguageBox.querySelector('span');
    const pcMenu = pcLanguageBox.querySelector('.header-language-menu');

    if (pcButton && pcMenu) {
      pcButton.addEventListener('click', (e) => {
        console.log('PC Language CLICK');
        e.stopPropagation();
        pcMenu.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        pcMenu.classList.remove('show');
      });

      pcMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  // ※スマホ側（.nav-language-item）でも、もしアコーディオンなどの開閉や
  // リンク移動のJSイベントを個別に設定している場合は、ここに記述します。
}


/* ===================================================
   ★PC・モバイル共通：リンククリック時に「即座に」メニューを初期化して閉じる
   =================================================== */
document.querySelectorAll('.dropdown a').forEach(a => {
  a.addEventListener('click', (event) => {

    // 【最速化】CSSのアニメーション（transition）を一時的に無効化して一瞬で消す
    if (typeof pageMenu !== 'undefined' && pageMenu) {
      // 一瞬だけアニメーションを完全にゼロにする
      pageMenu.style.transition = 'none';
      pageMenu.style.opacity = '0';
      pageMenu.style.visibility = 'hidden';

      // 次にメニューを開くときのために、一瞬後にスタイルを元に戻しておく
      setTimeout(() => {
        pageMenu.style.transition = '';
        pageMenu.style.opacity = '';
        pageMenu.style.visibility = '';
      }, 300); // 300ms（アニメーションが通常終わるくらいの時間）後にリセット
    }

    // 1. bodyの画面固定を解除
    document.body.classList.remove('menu-open');

    // 2. メニュー本体（pageMenu）のクラスを削除
    if (typeof pageMenu !== 'undefined' && pageMenu) {
      pageMenu.classList.remove('is-open', 'open', 'active');
    }

    // 3. トグルボタンの状態を元に戻す（文字もMenuに戻す）
    if (typeof pageToggle !== 'undefined' && pageToggle) {
      pageToggle.classList.remove('is-active', 'active', 'open');
      pageToggle.setAttribute('aria-expanded', 'false');

      const label = pageToggle.querySelector('.nav-toggle-label');
      if (label) {
        label.textContent = 'Menu';
      }
    }

    // 4. ドロップダウン（タブ）自体も「即座に」初期状態（非表示）に戻す
    const allDropdowns = document.querySelectorAll('.dropdown, .nav-item');
    allDropdowns.forEach(el => {
      // クラスを消すだけでなく、インラインスタイルでも一瞬で閉じる
      if (el.classList.contains('dropdown')) {
        el.style.transition = 'none';
        el.style.display = 'none'; // 一瞬非表示にする

        setTimeout(() => {
          el.style.transition = '';
          el.style.display = ''; // 次回のために元に戻す
        }, 300);
      }
      el.classList.remove('is-open', 'open', 'active', 'is-active');
    });

    // 5. その他の関連要素もリセット
    const relatedElements = document.querySelectorAll('.nav-toggle, .hamburger, .menu-trigger, nav, header');
    relatedElements.forEach(el => {
      el.classList.remove('open', 'active', 'is-open', 'is-active');
    });

    // 6. フォーカスを引き剥がす
    a.blur();
    if (document.activeElement) {
      document.activeElement.blur();
    }
  });
});


/* ===================================================
   採用情報：新卒採用・キャリア採用 タブ処理
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.data-card');
  // タブクリック処理
  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      // 通常の#移動を止める
      event.preventDefault();
      // 全タブ非アクティブ
      tabs.forEach(t => {
        t.classList.remove('is-active');
      });
      // クリックしたタブをアクティブ
      tab.classList.add('is-active');
      // 表示対象取得
      const targetId = tab.dataset.target;
      // カード表示切替
      cards.forEach(card => {
        if (card.id === targetId) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
      // 募集要項へ移動
      const recruitTop = document.getElementById('recruit-top');
      if (recruitTop) {
        recruitTop.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  // ------------------------------------------
  // ナビから ?tab=career で来た場合
  // ------------------------------------------
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab === 'career') {
    const careerTab = document.getElementById('tab-career');
    if (careerTab) {
      careerTab.click();
    }
  }
  if (tab === 'new') {
    const newTab = document.getElementById('tab-new');
    if (newTab) {
      newTab.click();
    }
  }
});

/* エラーメッセージの処理*/
/* バリデーション ＆ ローカル送信保護 統合処理 */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-simple-form, .entry-simple-form");
  if (!form) return;

  // ブラウザ標準のバリデーションを無効化
  form.setAttribute("novalidate", "");

  // ローカル環境（テスト環境）の判定
  const localFormPreview = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);

  form.addEventListener("submit", function (e) {
    let error = false;

    // 1. 全てのエラーメッセージとテストメッセージを一旦非表示（削除）にする
    form.querySelectorAll(".warning").forEach(w => w.style.display = "none");
    const existingMessage = form.querySelector('.form-status');
    if (existingMessage) existingMessage.remove();

    const checkedGroups = new Set();

    // 2. エラーチェックの実行
    form.querySelectorAll("[required]").forEach(field => {
      let ok = true;

      // ラジオボタンのチェック
      if (field.type === "radio") {
        if (checkedGroups.has(field.name)) return;
        const group = form.querySelectorAll(`input[name="${field.name}"]`);
        ok = [...group].some(r => r.checked);
        checkedGroups.add(field.name);

        if (!ok) {
          error = true;
          const fieldset = field.closest("fieldset");
          const warning = fieldset?.querySelector(".warning");
          if (warning) warning.style.display = "block";
        }
        return;
      }

      // チェックボックスのチェック
      if (field.type === "checkbox") {
        ok = field.checked;
      }
      // メールアドレスのチェック
      else if (field.type === "email") {
        const value = field.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        ok = emailPattern.test(value);
      }
      // その他の入力チェック
      else {
        ok = field.value.trim() !== "";
      }

      // エラー時の表示処理（radio以外）
      if (!ok) {
        error = true;
        const wrapper = field.closest("label") || field.closest("fieldset") || field.parentElement;
        const warning = wrapper?.querySelector(".warning");
        if (warning) {
          warning.style.display = "block";
          warning.style.visibility = "visible";
        }
      }
    });

    // 3. 【判定結果に応じた処理】
    if (error) {
      console.log("【送信停止】入力エラーがあります");

      // 実際の送信をストップ
      e.preventDefault();
      e.stopImmediatePropagation();

      // ★【ここがやりたかったこと】最初のエラーメッセージの場所まで画面をスクロール移動
      const firstError = form.querySelector('.warning[style*="display: block"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return false;

    } else {
      // 4. 【エラーがない場合のみ】ローカル環境のチェックを行う
      console.log("入力エラーなし");

      if (localFormPreview) {
        // テスト環境なら送信を止めてメッセージを表示
        e.preventDefault();

        const message = document.createElement('p');
        message.className = 'form-status';

        const isEn = typeof isEnglishPage !== 'undefined' && isEnglishPage;
        message.textContent = isEn
          ? 'This is a local test environment, so the message was not sent to the company. On the production PHP server, contact/mail.php will send it.'
          : 'テスト環境のため、会社宛には送信していません。本番PHPサーバーでは contact/mail.php から送信されます。';

        message.style.color = "#000000";
        message.style.marginTop = "10px";

        form.querySelector('.form-actions')?.before(message);
        console.log("ローカル環境用メッセージを表示しました");
      } else {
        // 本番環境ならそのままPHPへ送信（何もしない）
        console.log("本番環境のため、PHPへ送信します");
      }
    }
  });
});





// 下線を走るキャラクター
document.addEventListener('DOMContentLoaded', () => {

  const isHome =
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/');

  if (isHome) return;

  const subHero = document.querySelector('.sub-hero');
  if (!subHero) return;

  const runner = document.createElement('img');

  runner.src = `${basePath}test/assets/images/fav.png`;
  runner.className = 'border-runner jump';
  runner.alt = '';

  subHero.appendChild(runner);

  let leftPos = -120;
  let passedCenter = false;
  let stopped = false;
  let landing = false;

  const speed = 1.2;

  function move() {

    const width = subHero.clientWidth;

    function animate() {

      if (!stopped) {
        leftPos += speed;
      }

      runner.style.left = `${leftPos}px`;

      if (!passedCenter && leftPos >= width / 2 - 30) {

        passedCenter = true;
        landing = true;

        setTimeout(() => {

          if (!landing) return;

          stopped = true;

          runner.classList.remove('jump');
          runner.classList.add('land');

          setTimeout(() => {
            runner.classList.remove('land');
            runner.classList.add('turning');
          }, 250);

          setTimeout(() => {
            runner.classList.remove('turning');
            runner.classList.add('look-back');
          }, 750);

          setTimeout(() => {

            runner.classList.remove('look-back');
            runner.classList.add('turn-front');

            setTimeout(() => {

              runner.classList.remove('turn-front');
              runner.classList.add('jump');

              stopped = false;
              landing = false;

            }, 500);

          }, 2500);

        }, 300);

      }

      if (leftPos > width + 120) {

        leftPos = -120;
        passedCenter = false;
        landing = false;

        runner.style.left = `${leftPos}px`;

      }

      requestAnimationFrame(animate);

    }

    requestAnimationFrame(animate);

  }

  move();

});


 