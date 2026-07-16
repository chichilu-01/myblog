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