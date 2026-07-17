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
function translateTo(lang) {

    let path = location.pathname;

    // translate.goog上ならそのままパスを利用
    if (location.hostname.includes("translate.goog")) {

        window.location.href =
            `https://www-ones--house-co-jp.translate.goog${path}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;

    } else {

        const url = encodeURIComponent(location.href);

        window.location.href =
            `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${url}`;
    }

}

function translateToEnglish()    { translateTo("en"); }
function translateToKorean()     { translateTo("ko"); }
function translateToChinese()    { translateTo("zh-CN"); }
function translateToVietnamese() { translateTo("vi"); }
function translateToNepali()     { translateTo("ne"); }
function translateToPortuguese() { translateTo("pt"); }
function translateToFrench()     { translateTo("fr"); }

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
    const originalUrl = window.location.protocol + "//" + cleanHost + window.location.pathname;
    window.location.href = originalUrl;
    return;
  }

  // 通常ドメインにいる場合
  window.location.href = window.location.origin + window.location.pathname;
}

document.addEventListener("DOMContentLoaded", () => {

    // translate.goog上だけ実行
    if (!location.hostname.includes("translate.goog")) return;

    const lang = new URLSearchParams(location.search).get("_x_tr_tl") || "en";

    document.querySelectorAll("a[href]").forEach(link => {

        const href = link.getAttribute("href");

        // 外部リンクやJavaScriptは無視
        if (!href ||
            href.startsWith("#") ||
            href.startsWith("javascript:") ||
            href.startsWith("http")) {
            return;
        }

        // 相対URLを絶対URLへ
        const target = new URL(href, "https://www.ones-house.co.jp/");

        // translate.goog のURLへ書き換える
        link.href =
            `https://www-ones--house-co-jp.translate.goog${target.pathname}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;
    });

});