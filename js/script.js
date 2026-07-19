
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

function translateToEnglish()    { translateTo("en"); }
function translateToKorean()     { translateTo("ko"); }
function translateToChinese()    { translateTo("zh-CN"); }
function translateToVietnamese() { translateTo("vi"); }
function translateToNepali()     { translateTo("ne"); }
function translateToPortuguese() { translateTo("pt"); }
function translateToFrench()     { translateTo("fr"); }

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
            `https://www-ones--house-co-jp.translate.goog${target.pathname}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;
    });

});*/

document.addEventListener("DOMContentLoaded", () => {
    // 1. 蟇ｾ雎｡縺ｮ繝壹�繧ｸ��contact.html / contact_career.html�牙愛螳�
    const isContactPage = location.pathname.includes("contact.html") || location.pathname.includes("contact_career.html") || location.pathname.includes("contact_new.html");

    // 2. 繧ゅ＠騾壼ｸｸ縺ｮ繧ｵ繧､繝茨ｼ�translate.goog莉･螟厄ｼ峨�繧ｳ繝ｳ繧ｿ繧ｯ繝医�繝ｼ繧ｸ縺ｫ逶ｴ謗･譚･縺溘ｉ縲√ョ繝輔か繝ｫ繝郁ｨ隱橸ｼ井ｾ�: en�峨〒Google鄙ｻ險ｳ縺ｸ繝ｪ繝繧､繝ｬ繧ｯ繝�
    if (!location.hostname.includes("translate.goog")) {
        if (isContactPage) {
            const defaultLang = "en"; // 蛻晄悄繝ｪ繝繧､繝ｬ繧ｯ繝域凾縺ｮ鄙ｻ險ｳ蜈郁ｨ隱�
            const currentPath = location.pathname;
            location.href = `https://chichilu--01-github-io.translate.goog${currentPath}?_x_tr_sl=ja&_x_tr_tl=${defaultLang}&_x_tr_hl=ja`;
        }
        return; // 騾壼ｸｸ繧ｵ繧､繝医�莉悶�繝壹�繧ｸ縺ｧ縺ｯ縺薙ｌ莉･髯阪�蜃ｦ逅�ｼ医Μ繝ｳ繧ｯ譖ｸ縺肴鋤縺茨ｼ峨�荳崎ｦ�
    }

    // --- 縺薙％縺九ｉ荳九� translate.goog 荳翫〒縺ｮ縺ｿ螳溯｡後＆繧後ｋ蜃ｦ逅� ---

    // URL繝代Λ繝｡繝ｼ繧ｿ縺九ｉ迴ｾ蝨ｨ縺ｮ鄙ｻ險ｳ蜈郁ｨ隱槭ｒ蜿門ｾ暦ｼ医↑縺代ｌ縺ｰ en��
    const lang = new URLSearchParams(location.search).get("_x_tr_tl") || "en";

    // 繧ｵ繧､繝亥�縺ｮ蜈ｨ繝ｪ繝ｳ繧ｯ繧呈嶌縺肴鋤縺茨ｼ医％繧後〒莉悶�繝壹�繧ｸ縺ｫ遘ｻ蜍輔＠縺ｦ繧りｨ隱槭′邯ｭ謖√＆繧後ｋ��
    document.querySelectorAll("a[href]").forEach(link => {
        const href = link.getAttribute("href");

        // 螟夜Κ繝ｪ繝ｳ繧ｯ繧��繝代�繝�Μ繝ｳ繧ｯ縲゛avaScript縺ｯ辟｡隕�
        if (!href ||
            href.startsWith("#") ||
            href.startsWith("javascript:") ||
            href.startsWith("http")) {
            return;
        }

        // 逶ｸ蟇ｾURL繧堤ｵｶ蟇ｾURL縺ｸ螟画鋤�亥�縺ｮ繝峨Γ繧､繝ｳ蜷阪↓蜷医ｏ縺帙※菫ｮ豁｣縺励※縺上□縺輔＞��
        const target = new URL(href, "https://chichilu-01.github.io/myblog/");

        // translate.goog 縺ｮURL縺ｸ譖ｸ縺肴鋤縺医ｋ�育樟蝨ｨ縺ｮ險隱� lang 繧貞ｼ輔″邯吶＄��
        link.href = `https://chichilu--01-github-io.translate.goog${target.pathname}?_x_tr_sl=ja&_x_tr_tl=${lang}&_x_tr_hl=ja`;
    });
});