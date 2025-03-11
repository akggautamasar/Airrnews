const API_KEY = "d7f4aec67aa64ef39093bf7fea67bac2";  // Replace with your actual API key
const newsContainer = document.getElementById("news-container");

async function fetchNews() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`);
    const data = await res.json();

    data.articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `<h3>${article.title}</h3><p>${article.description}</p>`;
        newsContainer.appendChild(card);
    });
}

fetchNews();

