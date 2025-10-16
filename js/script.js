// --- DỮ LIỆU MẪU ---
const defaultPosts = [
   /* {
      id: 1,
      title: "Bài viết đầu tiên",
      date: "14/10/2025",
      image: "images/maytinh1.jpg",
      excerpt: "Đây là bài viết đầu tiên của blog cá nhân...",
      content: `
        <h2>Bài viết đầu tiên</h2>
        <img src="images/maytinh1.jpg" alt="Ảnh đại diện">
        <p>Chào mừng bạn đến với blog cá nhân!</p>
      `
    }*/
  ];
  
  // --- Lấy danh sách bài viết ---
  function getPosts() {
    const saved = localStorage.getItem("posts");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("posts", JSON.stringify(defaultPosts));
    return defaultPosts;
  }
  
  // --- Lưu danh sách ---
  function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
  }
  
  // --- Hiển thị năm hiện tại ---
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // --- Hiển thị danh sách bài viết trên trang chủ ---
  const container = document.getElementById("posts");
  if (container) {
    function renderPosts() {
      const posts = getPosts();
      container.innerHTML = "";
      posts.slice().reverse().forEach(p => {
        const post = document.createElement("article");
        post.className = "post";
        post.innerHTML = `
          ${p.image ? `<img src="${p.image}" alt="Ảnh đại diện">` : ""}
          <h2><a href="post.html?id=${p.id}">${p.title}</a></h2>
          <small>${p.date}</small>
          <p>${p.excerpt}</p>
        `;
        container.appendChild(post);
      });
    }
    renderPosts();
  }
  