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
});// --- DỮ LIỆU MẪU ---
export const defaultPosts = [
  {
    id: 1,
    title: "Bài viết đầu tiên",
    date: "14/01/2025",
    image: "images/maytinh1.jpg",
    excerpt: "Đây là bài viết đầu tiên của blog cá nhân...",
    content: `
        <h2>Bài viết đầu tiên</h2>
        <img src="images/maytinh1.jpg" alt="Ảnh đại diện">
        <p>Chào mừng bạn đến với blog cá nhân!</p>
      `
  },
  {
    id: 2,
    title: "自己PR",
    date: "14/10/2025",
    image: "images/anh1.jpg",
    excerpt: "責任感が強く、学んだことをすぐに行動に移せるタイプです。",
    content: `
        <p>責任感が強く、学んだことをすぐに行動に移せるタイプです。
         現在、Javaを中心にWeb開発を学び、HTML・CSS・JavaScript
         を使っておみくじアプリやログイン機能付きサイト、個人ブログなどを制作し、
         GitHubに公開しました。 落ち着いた性格ですが、チームの一員として責任を持ち、
         最後までやり遂げることができます。 入社後は、新しい技術を積極的に吸収し、
         成長し続けるエンジニアを目指します。</p>
      `
  }
];

