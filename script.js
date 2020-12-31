const API_KEY_JULIEN = "db84944e4adc4398803af0162c647905";

const drawCard = (news) => {
  return `<div class="card">
    <img src="${news.urlToImage}" alt="img" class="card-img-top">
    <h5>${news.title}</h5>
    <p>${news.description}</p>
    <a href="#" class="card-link">${news.source.name}</a>
    <a href="#" class="card-link">More</a></a>    
    <a href="#" class="card-link">${moment(news.publishedAt).fromNow()}</a>
  </div>`;
};

const removeNews = () => {
  const newsSection = document.getElementById("news");
  newsSection.innerHTML = "";
};
const searchBar = document
  .getElementById("searchbar")
  .addEventListener("keyup", (e) => {
    if (e.key === "Enter") update(e.target.value);
  });
const update = async (requestType) => {
  const url = requestType
    ? `https://newsapi.org/v2/top-headlines?q=${requestType}&country=us&apiKey=db84944e4adc4398803af0162c647905`
    : "https://newsapi.org/v2/top-headlines?country=us&apiKey=db84944e4adc4398803af0162c647905";
  const res = await fetch(url);
  const data = await res.json();
  render(data.articles);
};

const render = (news) => {
  removeNews();
  const newsSection = document.getElementById("news");
  const outputHtml = document.createElement("div");
  const output = news.map((article) => {
    return drawCard(article);
  });
  outputHtml.innerHTML = output.join("\n");
  newsSection.appendChild(outputHtml);
};

update();
