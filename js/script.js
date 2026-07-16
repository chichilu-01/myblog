
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
    const url = window.location.origin + window.location.pathname;

    window.location.href =
        `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(url)}`;
}

function translateToEnglish()    { translateTo("en"); }
function translateToKorean()     { translateTo("ko"); }
function translateToChinese()    { translateTo("zh-CN"); }
function translateToVietnamese() { translateTo("vi"); }
function translateToNepali()     { translateTo("ne"); }
function translateToPortuguese() { translateTo("pt"); }
function translateToFrench()     { translateTo("fr"); }

function backToJapanese() {
    window.location.href =
        window.location.origin + window.location.pathname;
}

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