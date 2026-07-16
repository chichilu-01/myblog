
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



// Google 翻訳の初期化
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'ja',
    includedLanguages: 'en,ko,zh-CN,vi,ne,pt,fr',
    autoDisplay: false
  }, 'google_translate_element');
}

// 言語切替関数
function changeLanguage(langCode) {
  var selectField = document.querySelector(".goog-te-combo");
  if (selectField) {
    selectField.value = langCode;
    selectField.dispatchEvent(new Event('change'));
  }
}

// HTMLの各関数をマッピング
function backToJapanese() { changeLanguage('ja'); }
function translateToEnglish() { changeLanguage('en'); }
function translateToKorean() { changeLanguage('ko'); }
function translateToChinese() { changeLanguage('zh-CN'); }
function translateToVietnamese() { changeLanguage('vi'); }
function translateToNepali() { changeLanguage('ne'); }
function translateToPortuguese() { changeLanguage('pt'); }
function translateToFrench() { changeLanguage('fr'); }