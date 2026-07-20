
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

  // 鄙ｻ險ｳ荳ｭ縺ｧ縺ｯ縺ｪ縺�
  if (!location.href.includes("translate.google")) {
    window.location.href = path;
    return;
  }

  // 迴ｾ蝨ｨ縺ｮ鄙ｻ險ｳ險隱槭ｒ蜿門ｾ�
  const url = new URL(location.href);
  const lang = url.searchParams.get("tl") || "en";

  const target =
    window.location.origin + path;

  window.location.href =
    `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(target)}`;
}
function translateTo(lang) {

  let path = location.pathname;

  // translate.goog荳翫↑繧峨◎縺ｮ縺ｾ縺ｾ繝代せ繧貞茜逕ｨ
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
  // Google鄙ｻ險ｳ蜀�ｼ医そ繝�す繝ｧ繝ｳ蛻�屬迥ｶ諷具ｼ峨�繧ｭ繝ｼ繧ょｿｵ縺ｮ縺溘ａ蜑企勁
  sessionStorage.removeItem("siteLanguage");

  const currentHost = window.location.hostname;

  // Google鄙ｻ險ｳ繝峨Γ繧､繝ｳ��*.translate.goog�牙�縺ｫ縺�ｋ蝣ｴ蜷医�蠕ｩ蜈��逅�
  if (currentHost.includes("translate.goog")) {
    let cleanHost = currentHost.split(".translate.goog")[0];

    // 繝峨Γ繧､繝ｳ縺ｮ蠕ｩ蜈�ｼ�-- 繧� - 縺ｫ縲�- 繧� . 縺ｫ謌ｻ縺呻ｼ�
    cleanHost = cleanHost
      .replace(/--/g, "___HYPHEN___")
      .replace(/-/g, ".")
      .replace(/___HYPHEN___/g, "-");

    // 笘�律譛ｬ隱槭↓謌ｻ繧矩圀縲ゞRL繝代Λ繝｡繝ｼ繧ｿ縺ｫ縲罫esetLang=true縲阪ｒ莉倅ｸ弱＠縺ｦ繝ｪ繝繧､繝ｬ繧ｯ繝医☆繧�
    const originalUrl = window.location.protocol + "//" + cleanHost + window.location.pathname;
    window.location.href = originalUrl;
    return;
  }

  // 騾壼ｸｸ繝峨Γ繧､繝ｳ縺ｫ縺�ｋ蝣ｴ蜷�
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

document.addEventListener("DOMContentLoaded", () => {

  const SITE = "https://chichilu-01.github.io";
  const GOOGLE = "https://chichilu--01-github-io.translate.goog";

  const formPages = [
    "cv.html",
    "contact_career.html",
    "contact_new.html"
  ];

  // Lấy ngôn ngữ hiện tại
  const lang =
    new URLSearchParams(location.search).get("_x_tr_tl") ||
    window.name;

  console.log("========== PAGE ==========");
  console.log("URL:", location.href);
  console.log("lang:", lang);
  console.log("window.name:", window.name);

  document.querySelectorAll("a[href]").forEach(link => {

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

    //--------------------------------------------------
    // Luôn lấy URL gốc
    //--------------------------------------------------

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
    // 1. ĐI VÀO FORM
    //--------------------------------------------------

    if (formPages.includes(targetPage)) {

      if (lang) {
        window.name = lang;
      }

      console.log("===== GO FORM =====");
      console.log("save:", window.name);

      // luôn mở trang gốc
      link.href =
        SITE +
        target.pathname +
        target.search +
        target.hash;

      return;
    }

    //--------------------------------------------------
    // 2. ĐANG Ở FORM -> QUAY RA
    //--------------------------------------------------

    if (formPages.includes(currentPage)) {

      const savedLang = window.name;

      console.log("===== LEAVE FORM =====");
      console.log("window.name:", savedLang);

      if (savedLang) {

        const path =
          target.pathname +
          target.search +
          target.hash;

        link.href =
          `${GOOGLE}${path}?_x_tr_sl=ja&_x_tr_tl=${savedLang}&_x_tr_hl=ja`;

      } else {

        link.href =
          SITE +
          target.pathname +
          target.search +
          target.hash;

      }

      return;
    }

    //--------------------------------------------------
    // 3. TRANG BÌNH THƯỜNG
    //--------------------------------------------------

    if (lang) {

      const path =
        target.pathname +
        target.search +
        target.hash;

      link.href =
        `${GOOGLE}${path}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;

    } else {

      link.href =
        SITE +
        target.pathname +
        target.search +
        target.hash;

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

