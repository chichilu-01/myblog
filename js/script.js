
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




// --- 翻訳用設定 ---
const LANG_KEY = "siteLanguage";
const NO_TRANSLATE_PAGES = ["contact.html", "contact_new.html", "contact_career.html"];

// 翻訳URLを生成する関数
function getTranslateUrl(url, lang) {
  return `https://translate.google.com/translate?sl=ja&tl=${lang}&u=${encodeURIComponent(url)}`;
}

// ページ遷移をインターセプトする処理（重要）
document.addEventListener("click", (event) => {
  const lang = sessionStorage.getItem(LANG_KEY);
  if (!lang) return; // 言語設定がなければ何もしない

  // クリックされたのが <a> タグか確認
  const link = event.target.closest("a");
  if (!link || !link.href) return;

  const url = new URL(link.href);

  // 1. 同一ドメインかつ翻訳対象外ページでない場合のみ翻訳URLへ書き換え
  if (url.origin === window.location.origin && 
      !NO_TRANSLATE_PAGES.some(p => url.pathname.endsWith(p))) {
    
    event.preventDefault(); // 一旦遷移を止める
    window.location.href = getTranslateUrl(link.href, lang); // 翻訳URLへ遷移
  }
}, true); // キャプチャモードで先にイベントを拾う

// 言語切り替え時の処理
function translateTo(lang) {
  sessionStorage.setItem(LANG_KEY, lang);
  const isNoTranslate = NO_TRANSLATE_PAGES.some(p => window.location.pathname.endsWith(p));
  
  if (isNoTranslate) {
    window.location.reload();
  } else {
    window.location.href = getTranslateUrl(window.location.href, lang);
  }
}

// 日本語に戻す処理
function backToJapanese() {
  sessionStorage.removeItem(LANG_KEY);
  if (location.hostname.includes("translate.goog")) {
    let cleanHost = location.hostname.split(".translate.goog")[0].replace(/--/g, "___HYPHEN___").replace(/-/g, ".").replace(/___HYPHEN___/g, "-");
    window.location.href = window.location.protocol + "//" + cleanHost + window.location.pathname;
  } else {
    window.location.reload();
  }
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