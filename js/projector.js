let isPowerOn = false; // Trạng thái này cần được cập nhật
let channel = 0;

const posts = [
    { title: "プログラミング", excerpt: "ベストコードになりたい...", img: "images/maytinh1.jpg" },
    { title: "わくわく", excerpt: "遊び日...", img: "images/anh1.jpg" },
    { title: "日記", excerpt: "楽しい日...", img: "images/tansho2.jpg" },
    { title: "考えること", excerpt: "...", img: "images/maytinh2.jpg" },
    { title: "趣味", excerpt: "Sobaが大好き...", img: "images/soba.jpg" }
];

function updateDisplay() {
    const title = document.getElementById('post-title');
    const excerpt = document.getElementById('post-excerpt');
    const img = document.getElementById('post-image');

    // Cập nhật nội dung
    title.innerText = posts[channel].title;
    excerpt.innerText = posts[channel].excerpt;
    img.src = posts[channel].img;

    // Hiển thị (sử dụng display: block để ghi đè lại display: none khi tắt)
    img.style.display = "block";
    title.style.display = "block";
    excerpt.style.display = "block";

    // Thêm class để kích hoạt CSS transition
    title.classList.add('show');
    excerpt.classList.add('show');
}

function togglePower() {
    const powerBtn = document.getElementById('power-btn');
    const title = document.getElementById('post-title');
    const excerpt = document.getElementById('post-excerpt');
    const image = document.getElementById('post-image');

    // Đảo ngược trạng thái
    isPowerOn = !isPowerOn;
    powerBtn.classList.toggle('on');

    if (!isPowerOn) {
        // TẮT: Ẩn tất cả và xóa class 'show'
        title.style.display = 'none';
        excerpt.style.display = 'none';
        image.style.display = 'none';

        title.classList.remove('show');
        excerpt.classList.remove('show');
    } else {
        // BẬT: Hiển thị bài viết hiện tại
        updateDisplay();
    }
}

function changeChannel() {
    // Bây giờ isPowerOn đã được cập nhật đúng
    if (!isPowerOn) return;

    const screen = document.getElementById('post-screen');
    const title = document.getElementById('post-title');
    const excerpt = document.getElementById('post-excerpt');
    const img = document.getElementById('post-image');

    // Ẩn nội dung hiện tại
    title.classList.remove('show');
    excerpt.classList.remove('show');
    img.style.display = "none";

    // Tạo hiệu ứng nhiễu
    screen.classList.add('static');

    setTimeout(() => {
        channel = (channel + 1) % posts.length;
        updateDisplay(); // Hiển thị nội dung mới
        screen.classList.remove('static');
    }, 500);
}