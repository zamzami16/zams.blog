const mediumUsername = "mohyusufz";
const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
const articlesContainer = document.getElementById("medium-articles");
const paginationContainer = document.getElementById("pagination-controls");
const postsPerPage = 6;

let allPosts = [];
let currentPage = 1;

fetch(feedUrl)
  .then((response) => response.json())
  .then((data) => {
    allPosts = data.items.filter((item) => item.categories.length > 0);
    renderPage(currentPage);
    renderPagination();
  })
  .catch((error) => {
    console.error("Error loading Medium posts:", error);
  });

function renderPage(page) {
  articlesContainer.innerHTML = "";

  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = allPosts.slice(start, end);

  pagePosts.forEach((post) => {
    const col = document.createElement("div");
    col.className = "col-md-6 mb-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm border-0";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Title
    const title = document.createElement("h5");
    title.className = "card-title fw-semibold mb-2";
    title.textContent = post.title;

    // Meta info
    const pubDate = new Date(post.pubDate);
    const readTime = Math.ceil(post.content.split(" ").length / 200);
    const meta = document.createElement("p");
    meta.className = "text-muted fst-italic small mb-2";
    meta.textContent = `${pubDate.toLocaleDateString()} • ${readTime} min read`;

    // Excerpt
    const excerpt = document.createElement("p");
    excerpt.className = "card-text lh-sm mb-3";
    const plainText = post.content.replace(/<[^>]+>/g, "");
    excerpt.textContent = plainText.substring(0, 100) + "...";

    // Read more button
    const readMore = document.createElement("a");
    readMore.href = post.link;
    readMore.target = "_blank";
    readMore.rel = "noopener noreferrer";
    readMore.className = "btn btn-sm btn-outline-primary fw-medium";
    readMore.textContent = "Read on Medium";

    cardBody.appendChild(title);
    cardBody.appendChild(meta);
    cardBody.appendChild(excerpt);
    cardBody.appendChild(readMore);

    card.appendChild(cardBody);
    col.appendChild(card);
    articlesContainer.appendChild(col);
  });

  currentPage = page;
  renderPagination();
}

function renderPagination() {
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item" + (i === currentPage ? " active" : "");

    const btn = document.createElement("button");
    btn.className = "page-link";
    btn.textContent = i;
    btn.addEventListener("click", () => {
      renderPage(i);
    });

    li.appendChild(btn);
    paginationContainer.appendChild(li);
  }
}
