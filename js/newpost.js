/* --- js/newpost.js (ĐÃ HOÀN THIỆN) --- */

// 1. Các hàm tiện ích (Utilities) đặt ra ngoài để dùng chung
function getPosts() {
  const saved = localStorage.getItem("posts");
  return saved ? JSON.parse(saved) : [];
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// 2. Logic xử lý form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newPostForm");
  
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const newPost = {
        id: Date.now(),
        title: document.getElementById("title").value.trim(),
        // ... (các dữ liệu khác của bạn)
        date: new Date().toLocaleDateString("vi-VN")
      };

      const posts = getPosts();
      posts.unshift(newPost);
      savePosts(posts);

      alert("✅ Bài viết đã được lưu thành công!");
      window.location.href = "index.html";
    });
  }
});