const endpoint = "https://www.rollingstone.com/wp-json/wp/v2/posts";

/**
 * Recupera gli ultimi 10 articoli dall'endpoint.
 * @returns {Array} posts Gli ultimi 10 articoli.
 */
async function fetchPosts() {
    const response = await fetch(endpoint);
  const posts = await response.json();
    return posts;
}

async function insertPosts() {
    const posts = await fetchPosts();
    let html = '';
    const postsContainer = document.querySelector(".posts");
    posts.forEach((post) => {
        html += `
        <article id="post-${post.id}">
            <div class="thumbnail" style="background-image: url(${post.jetpack_featured_media_url});"></div>
            <div class="entry">
                <h2 class="entry-title">${post.title.rendered}</h2>
                ${post.excerpt.rendered}
            </div>
            <div class="actions">
                <a href="${post.link}">Leggi</a>
            </div>
        </article>
        `;
    });
    postsContainer.innerHTML = html;
}

insertPosts();
