console.log(menuBtn);
console.log(nav);
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    const body = document.body;

    // Xử lý click mở/đóng menu
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
        nav.classList.toggle('active');

        // Thay đổi icon menu
        const icon = menuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Tự động điền năm vào footer
    document.getElementById('year').textContent = new Date().getFullYear();
});



// ページ読み込み完了後に実行
/*window.addEventListener('load', function () {
    var frame = document.getElementById('gt-nvframe');
    if (frame) {
        frame.style.display = 'none';
        document.body.style.marginTop = '0px';
    }
});*/


// ==========================================
// 翻訳管理システム（全ページ共通）
// ==========================================

function translateTo(lang) {
  sessionStorage.setItem("siteLanguage", lang);
  const cleanUrl = window.location.origin + window.location.pathname;

  // すでに翻訳ドメインにいる場合：パラメータを更新して再読み込み
  if (window.location.hostname.includes("translate.goog")) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("tl", lang);
    window.top.location.href = currentUrl.toString();
  } else {
    // 通常ドメインにいる場合：翻訳URLへジャンプ
    window.location.href = `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(cleanUrl)}`;
  }
}

function backToJapanese() {
  sessionStorage.removeItem("siteLanguage");
  if (window.location.hostname.includes("translate.goog")) {
    // ドメイン復元処理
    let cleanHost = window.location.hostname.split(".translate.goog")[0]
      .replace(/--/g, "___HYPHEN___").replace(/-/g, ".").replace(/___HYPHEN___/g, "-");
    window.location.href = window.location.protocol + "//" + cleanHost + window.location.pathname + "?resetLang=true";
  } else {
    window.location.href = window.location.origin + window.location.pathname;
  }
}

// 各言語トリガー
function translateToEnglish()    { translateTo("en"); }
function translateToKorean()     { translateTo("ko"); }
function translateToChinese()    { translateTo("zh-CN"); }
function translateToVietnamese() { translateTo("vi"); }
function translateToNepali()     { translateTo("ne"); }
function translateToPortuguese() { translateTo("pt"); }
function translateToFrench()     { translateTo("fr"); }

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("resetLang") === "true") {
    sessionStorage.removeItem("siteLanguage");
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  const lang = sessionStorage.getItem("siteLanguage");
  const noTranslatePages = ["/test/contact/contact.html", "/test/recruit/contact_new.html", "/test/recruit/contact_career.html"];

  // 翻訳設定があり、かつ現在通常ドメインなら翻訳へ飛ばす
  if (lang && !window.location.hostname.includes("translate.goog") && !noTranslatePages.includes(window.location.pathname)) {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.location.href = `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(cleanUrl)}`;
  }
});

// 5. 【重要】リンククリック時のシームレス遷移
document.addEventListener("click", function (e) {
  const target = e.target.closest("a");
  if (!target || !target.href) return;

  const lang = sessionStorage.getItem("siteLanguage");
  if (!lang) return;

  // すでに翻訳ドメイン（translate.goog）にいる場合
  if (window.location.hostname.includes("translate.goog")) {
    // リンク先も翻訳ドメインになるよう、パラメータを維持して遷移させる
    const url = new URL(target.href);
    if (url.hostname === window.location.hostname.split(".translate.goog")[0].replace(/_/g, ".")) {
      // リンク先が自サイト内であれば、Google翻訳ドメイン形式にURLを変換
      const newHost = url.hostname.replace(/\./g, "-") + ".translate.goog";
      url.hostname = newHost;
      url.searchParams.set("tl", lang);
      target.href = url.toString();
    }
  } 
  // 通常ドメインから遷移する場合
  else {
    const url = new URL(target.href);
    const isInternal = url.hostname === window.location.hostname;
    const noTranslatePages = ["/test/contact/contact.html", "/test/recruit/contact_career.html", "/test/recruit/contact_new.html"];
    
    if (isInternal && !noTranslatePages.some(page => url.pathname.includes(page))) {
      e.preventDefault();
      window.location.href = `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(target.href)}`;
    }
  }
});