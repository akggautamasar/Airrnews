const API_KEY = "e7a83668-9fd1-4b09-a497-b0c39dc2b7ec";  
const newsContainer = document.getElementById("news-container");

async function fetchNews() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`);
    const data = await res.json();

    data.articles.forEach(article => {
        if (!article.urlToImage) return; // Skip articles without images

        const card = document.createElement("div");
        card.className = "news-card";

        card.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || "Click to read more..."}</p>
                <a href="#" class="share-btn" onclick="shareNews(event, '${article.title}', '${article.url}')">📤 Share</a>
            </div>
        `;

        card.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        newsContainer.appendChild(card);
    });
}

// Share News Function
function shareNews(event, title, url) {
    event.stopPropagation(); // Prevent clicking the card

    if (navigator.share) {
        navigator.share({
            title: title,
            text: "Check out this news: " + title,
            url: url
        }).catch(err => console.log("Error sharing:", err));
    } else {
        alert("Sharing is not supported on this browser.");
    }
}

fetchNews();
