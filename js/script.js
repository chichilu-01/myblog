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

function loadGoogleTranslate() {
    // 1. グローバル関数を定義
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'ja',
            includedLanguages: 'en,ko,zh-CN,vi,ne,pt,fr',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };

    // 2. スクリプト要素を作成して head に追加
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
}

// 実行したいタイミングで呼び出す
// 例: ページ読み込み完了時
window.addEventListener('load', loadGoogleTranslate);

function doGoogleTranslate(lang) {
    // 1. Google翻訳用のCookieをセット (有効期限1年)
    // 形式: /auto/対象言語
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = "googtrans=/auto/" + lang + "; expires=" + date.toUTCString() + "; path=/";
    
    // 2. ページをリロードして翻訳を適用
    location.reload();
}

// 各関数の割り当て
function backToJapanese() { doGoogleTranslate('ja'); }
function translateToEnglish() { doGoogleTranslate('en'); }
function translateToKorean() { doGoogleTranslate('ko'); }
function translateToChinese() { doGoogleTranslate('zh-CN'); }
function translateToVietnamese() { doGoogleTranslate('vi'); }
function translateToNepali() { doGoogleTranslate('ne'); }
function translateToPortuguese() { doGoogleTranslate('pt'); }
function translateToFrench() { doGoogleTranslate('fr'); }