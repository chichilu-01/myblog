


function goTranslatedPage(path) {

 // 翻訳中ではない場合
  if (!location.href.includes("translate.google")) {
    window.location.href = path;
    return;
  }

 // 翻訳中ではない場合
  const url = new URL(location.href);
  const lang = url.searchParams.get("tl") || "en";

  const target =
    window.location.origin + path;

  window.location.href =
    `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(target)}`;
}
function translateTo(lang) {

  let path = location.pathname;

  // translate.goog上にいる場合は、そのまま翻訳URLを作成
  if (location.hostname.includes("translate.goog")) {

    window.location.href =
      `https://www-ones--house-co-jp.translate.goog${path}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;

  } else {

    const url = encodeURIComponent(location.href);

    window.location.href =
      `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${url}`;
  }

}

function translateToEnglish() { translateTo("en"); }
function translateToKorean() { translateTo("ko"); }
function translateToChinese() { translateTo("zh-CN"); }
function translateToVietnamese() { translateTo("vi"); }
function translateToNepali() { translateTo("ne"); }
function translateToPortuguese() { translateTo("pt"); }
function translateToFrench() { translateTo("fr"); }

function backToJapanese() {
  window.name = "";
  // Google翻訳のセッション情報（言語保存状態）を削除
  sessionStorage.removeItem("siteLanguage");

  const currentHost = window.location.hostname;

  // Google翻訳ドメイン（*.translate.goog）にいる場合の復元処理
  if (currentHost.includes("translate.goog")) {
    let cleanHost = currentHost.split(".translate.goog")[0];
    // 翻訳用ドメインを元のドメイン形式へ戻す
    cleanHost = cleanHost
      .replace(/--/g, "___HYPHEN___")
      .replace(/-/g, ".")
      .replace(/___HYPHEN___/g, "-");

    // 日本語ページへ戻る
    const originalUrl = window.location.protocol + "//" + cleanHost + window.location.pathname;
    window.location.href = originalUrl;
    return;
  }

  // 通常ドメインの場合
  window.location.href = window.location.origin + window.location.pathname;
}

function cleanGoogleTranslateParams(url) {
  const u = new URL(url);
  u.searchParams.delete("_x_tr_sl");
  u.searchParams.delete("_x_tr_tl");
  u.searchParams.delete("_x_tr_hl");
  return u.pathname + u.search + u.hash;
}


document.addEventListener("DOMContentLoaded", () => {
  const SITE = "https://www.ones-house.co.jp/test/";
  const GOOGLE = "https://www-ones--house-co-jp.translate.goog";
  const formPages = [
    "contact.html",
    "contact_career.html",
    "contact_new.html"
  ];
  const lang =
    new URLSearchParams(location.search).get("_x_tr_tl") ||
    window.name;
  console.log("========== PAGE ==========");
  console.log("URL:", location.href);
  console.log("lang:", lang);
  console.log("window.name:", window.name);
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("javascript:") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }
    let base;
    if (location.hostname.includes("translate.goog")) {
      base = SITE + location.pathname;
    } else {
      base = location.href;
    }
    const target = new URL(href, base);
    const targetPage = target.pathname.split("/").pop();
    const currentPage = location.pathname.split("/").pop();

    //--------------------------------------------------
    // 1. フォームページへ移動
    //--------------------------------------------------

    if (formPages.includes(targetPage)) {
      if (lang) {
        window.name = lang;
      }
      console.log("GO FORM");
      console.log(window.name);
      e.preventDefault();
      const cleanPath =
        cleanGoogleTranslateParams(target.href);
      window.location.href =
        SITE + cleanPath;
      return;
    }

    //--------------------------------------------------
    // 2. フォームページから通常ページへ戻る
    //--------------------------------------------------

    if (formPages.includes(currentPage)) {
      e.preventDefault();
      const savedLang = window.name;
      console.log("LEAVE FORM");
      console.log(savedLang);
      if (savedLang) {
        const path = cleanGoogleTranslateParams(target.href);
        window.location.href =
          `${GOOGLE}${path}?_x_tr_sl=ja&_x_tr_tl=${savedLang}&_x_tr_hl=ja`;
      } else {
        window.location.href =
          SITE +
          target.pathname +
          target.search +
          target.hash;
      }
      return;
    }
    //--------------------------------------------------
    // 3. 通常ページ間の移動
    //--------------------------------------------------
    if (lang) {
      e.preventDefault();
      const path = cleanGoogleTranslateParams(target.href);
      window.location.href =
        `${GOOGLE}${path}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;
    }
  });
});




