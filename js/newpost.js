// --- Hiển thị năm hiện tại ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Lấy danh sách bài viết từ localStorage ---
function getPosts() {
  const saved = localStorage.getItem("posts");
  if (saved) return JSON.parse(saved);
  return [];
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// --- Xử lý submit form ---
const form = document.getElementById("newPostForm");
form.addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const excerpt = document.getElementById("excerpt").value.trim();
  const content = document.getElementById("content").value.trim();
  const image = document.getElementById("imageSelect").value;

  if (!title || !content) {
    alert("Vui lòng nhập tiêu đề và nội dung!");
    return;
  }

  const posts = getPosts();

  const newPost = {
    id: Date.now(),
    title,
    excerpt,
    image: image || "",
    date: new Date().toLocaleDateString("vi-VN"),
    content: `
      <h2>${title}</h2>
      ${image ? `<img src="${image}" alt="Ảnh đại diện">` : ""}
      <p>${content.replace(/\n/g, "<br>")}</p>
    `
  };

  posts.push(newPost);
  savePosts(posts);

  alert("✅ Bài viết đã được lưu!");
  window.location.href = "index.html";
});
