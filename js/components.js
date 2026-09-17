document.addEventListener('DOMContentLoaded', () => {

    // Header
    const headerHTML = `
    <header class="site-header">
        <div class="container header-content">

            <div class="logo">
                <h1>
                    <a href="../index.html">
                        <i class="fa-solid fa-pen-nib"></i>
                        Welcome to My Blog
                    </a>
                </h1>
            </div>

            <nav class="main-nav">
                <a href="../index.html">
                    <i class="fa-solid fa-house"></i> Home
                </a>

                <a href="../about/about.html">
                    <i class="fa-solid fa-user"></i> About
                </a>

                <a href="../newpost/newpost.html">
                    <i class="fa-solid fa-pen"></i> 記事を書く
                </a>

                <a href="../cv/cv.html" class="btn-highlight">
                    <i class="fa-solid fa-file-lines"></i> 履歴書
                </a>
            </nav>

            <button type="button" class="mobile-menu-btn">
                <i class="fa-solid fa-bars"></i>
            </button>

        </div>
    </header>`;

    // Footer
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
                    <li>
                        <i class="fa-solid fa-envelope"></i>
                        hoangminhphuong270401@gmail.com
                    </li>
                    <li>
                        <i class="fa-solid fa-phone"></i>
                        08058264308
                    </li>
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
            <p>
                &copy; <span id="year"></span>
                HOANG MINH PHUONG. All rights reserved.
            </p>
        </div>
    </footer>`;

    // 表示
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');

    if (header) header.innerHTML = headerHTML;
    if (footer) footer.innerHTML = footerHTML;

    // 年
    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');

    if (menuBtn && nav) {

        const icon = menuBtn.querySelector('i');

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            nav.classList.toggle('active');

            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // 外側をクリックしたら閉じる
        document.addEventListener('click', (e) => {

            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {

                nav.classList.remove('active');

                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
});