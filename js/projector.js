let isPowerOn = false; // Trạng thái này cần được cập nhật
let channel = 0;

const posts = [
  { title: "Lập trình", excerpt: "Hành trình code dạo...", img: "images/maytinh1.jpg" },
  { title: "Nhật ký", excerpt: "Cuộc sống tại Nhật...", img: "images/anh1.jpg" },
  { title: "Ẩm thực", excerpt: "Công thức mì Soba...", img: "images/soba.jpg" }
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