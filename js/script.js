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


// 1. 翻訳実行関数（Google翻訳ドメイン内での挙動を改善）
function translateTo(lang) {
  const currentHost = window.location.hostname;
  sessionStorage.setItem("siteLanguage", lang);

  if (currentHost.includes("translate.goog")) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("tl", lang);
    window.top.location.href = currentUrl.toString();
  } else {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.location.href = `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(cleanUrl)}`;
  }
}

// 言語トリガー関数（略）
function translateToEnglish()    { translateTo("en"); }
function translateToKorean()     { translateTo("ko"); }
function translateToChinese()    { translateTo("zh-CN"); }
function translateToVietnamese() { translateTo("vi"); }
function translateToNepali()     { translateTo("ne"); }
function translateToPortuguese() { translateTo("pt"); }
function translateToFrench()     { translateTo("fr"); }

// 2. 日本語に戻す処理（より確実な方法）
function backToJapanese() {
  sessionStorage.removeItem("siteLanguage");
  
  if (window.location.hostname.includes("translate.goog")) {
    // 複雑な置換を避け、Google翻訳の「元のURLに戻る」機能を利用する
    // これが最も安全で確実です
    window.top.location.href = window.location.origin.split('.translate.goog')[0].replace(/-/g, '.').replace(/_/g, '-') + window.location.pathname + "?resetLang=true";
  } else {
    window.location.href = window.location.pathname + "?resetLang=true";
  }
}

// 3. 【重要】即時翻訳判定（DOMContentLoadedを待たない）
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const resetLang = urlParams.get("resetLang");
  
  // リセット命令がある場合はセッション削除して終了
  if (resetLang === "true") {
    sessionStorage.removeItem("siteLanguage");
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  // 翻訳先言語の取得
  const lang = sessionStorage.getItem("siteLanguage");
  if (!lang) return;

  // 除外ページ判定
  const noTranslatePages = [
    "/test/contact/contact.html",
    "/test/recruit/contact_new.html",
    "/test/recruit/contact_career.html"
  ];
  if (noTranslatePages.includes(window.location.pathname)) return;

  // すでに翻訳ドメインなら何もしない
  if (location.hostname.includes("translate.goog")) return;

  // 翻訳へ強制リダイレクト（ページが表示される前に実行）
  const cleanUrl = window.location.origin + window.location.pathname;
  window.location.href = `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(cleanUrl)}`;
})();