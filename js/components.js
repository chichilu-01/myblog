document.addEventListener('DOMContentLoaded', () => {
    // リンクのルート相対パス（/から始まる）を維持
    const headerHTML = `
    <header class="site-header">
        <div class="container header-content">
            <div class="logo">
                <h1><a href="../index.html"><i class="fa-solid fa-pen-nib"></i> Welcome to My Blog</a></h1>
            </div>
            <nav class="main-nav">
                <a href="../index.html"><i class="fa-solid fa-house"></i> Home</a>
                <a href="../about/about.html"><i class="fa-solid fa-user"></i> About</a>
                <a href="../newpost/newpost.html"><i class="fa-solid fa-pen"></i> 記事を書く</a>
                <a href="../cv/cv.html" class="btn-highlight"><i class="fa-solid fa-file-lines"></i> 履歴書</a>
            </nav>
            <button class="mobile-menu-btn">
                <i class="fa-solid fa-bars"></i>
            </button>
        </div>
    </header>`;

    const footerHTML = `
    <footer>
        <div class="container footer-content">
            <div class="footer-col">
                <h3>Hoang Minh Phuong</h3>
                <p>プログラミングや料理、ライフ体験についてシェアする個人ブログ。</p>
            </div>
            <div class="footer-col">
                <h3>連絡</h3>
                <ul class="contact-info">
                    <li><i class="fa-solid fa-envelope"></i> hoangminhphuong270401@gmail.com</li>
                    <li><i class="fa-solid fa-phone"></i> 08058264308</li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>接続</h3>
                <div class="social-links">
                    <a href="#"><i class="fa-brands fa-github"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <span id="year"></span> HOANG MINH PHUONG. All rights reserved.</p>
        </div>
    </footer>`;

    const headerEl = document.getElementById('header');
    const footerEl = document.getElementById('footer');
    if (headerEl) headerEl.innerHTML = headerHTML;
    if (footerEl) footerEl.innerHTML = footerHTML;
    if (document.getElementById('year')) document.getElementById('year').textContent = new Date().getFullYear();

    // メニュー初期化
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    if (menuBtn && nav) {
        const icon = menuBtn.querySelector('i');

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            nav.classList.toggle('active');

            if (nav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                nav.classList.remove('active');
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
});