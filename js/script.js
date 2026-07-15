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

// ボタンをクリックした時に初めてGoogle翻訳を読み込む
document.getElementById('my-translate-button').addEventListener('click', function() {
    var s = document.createElement('script');
    s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(s);
});
