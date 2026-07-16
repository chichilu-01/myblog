
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



function translateTo(lang) {
    const url = window.location.origin + window.location.pathname;

    window.location.href =
        `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(url)}`;
}
function goTranslatedPage(path) {

    // 翻訳中ではない
    if (!location.href.includes("translate.google")) {
        window.location.href = path;
        return;
    }

    // 現在の翻訳言語を取得
    const url = new URL(location.href);
    const lang = url.searchParams.get("tl") || "en";

    const target =
        window.location.origin + path;

    window.location.href =
        `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(target)}`;
}

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