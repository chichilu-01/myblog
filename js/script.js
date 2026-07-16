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