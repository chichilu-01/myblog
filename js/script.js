
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
      `https://chichilu--01-github-io.translate.goog${path}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;

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

/*document.addEventListener("DOMContentLoaded", () => {

    // translate.goog荳翫□縺大ｮ溯｡�
    if (!location.hostname.includes("translate.goog")) return;

    const lang = new URLSearchParams(location.search).get("_x_tr_tl") || "en";

    document.querySelectorAll("a[href]").forEach(link => {

        const href = link.getAttribute("href");

        // 螟夜Κ繝ｪ繝ｳ繧ｯ繧ЙavaScript縺ｯ辟｡隕�
        if (!href ||
            href.startsWith("#") ||
            href.startsWith("javascript:") ||
            href.startsWith("http")) {
            return;
        }

        // 逶ｸ蟇ｾURL繧堤ｵｶ蟇ｾURL縺ｸ
        const target = new URL(href, "https://chichilu-01.github.io/myblog/");

        // translate.goog 縺ｮURL縺ｸ譖ｸ縺肴鋤縺医ｋ
        link.href =
            `https://.translate.goog${target.pathname}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;
    });

});*/
function cleanGoogleTranslateParams(url) {

  const u = new URL(url);

  u.searchParams.delete("_x_tr_sl");
  u.searchParams.delete("_x_tr_tl");
  u.searchParams.delete("_x_tr_hl");

  return u.pathname + u.search + u.hash;
}



document.addEventListener("DOMContentLoaded", () => {
  const SITE = "https://chichilu-01.github.io";
  const GOOGLE = "https://chichilu--01-github-io.translate.goog";
  const formPages = [
    "newpost.html",
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
        /*const path =
          target.pathname +
          target.search +
          target.hash;*/
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
      /*const path =
        target.pathname +
        target.search +
        target.hash;*/
      const path = cleanGoogleTranslateParams(target.href);
      window.location.href =
        `${GOOGLE}${path}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;
    }
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

