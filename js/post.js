// --- Hiển thị năm ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Lấy bài viết từ localStorage ---
function getPosts() {
  const saved = localStorage.getItem("posts");
  if (saved) return JSON.parse(saved);
  return [];
}

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const posts = getPosts();
const post = posts.find(p => p.id === id);
const container = document.getElementById("post-content");

if (!post) {
  container.innerHTML = "<p>Không tìm thấy bài viết.</p>";
} else {
  container.innerHTML = `
    <div class="post-content">
      ${post.image ? `<img src="${post.image}" alt="Ảnh bài viết">` : ""}
      ${post.content}
    </div>
  `;
}

// --- Hiệu ứng zoom ảnh ---
document.addEventListener("click", (e) => {
  const target = e.target;

  // Nếu click vào ảnh trong bài viết
  if (target.tagName === "IMG" && target.closest(".post-content")) {
    const popup = document.createElement("div");
    popup.classList.add("image-popup");

    const img = document.createElement("img");
    img.src = target.src;
    popup.appendChild(img);

    document.body.appendChild(popup);

    // Đóng popup khi click
    popup.addEventListener("click", () => popup.remove());
  }
});
