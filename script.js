const API_KEY_JULIEN = "db84944e4adc4398803af0162c647905";

const drawCard = (news) => {
  return `<div class="example-2 card">
<div class="wrapper" style="background: url(${
    news.urlToImage
  }) 20% 1%/cover no-repeat;">
<div class="header">
  <div class="date">
    <div href="#" class="card-link">${moment(news.publishedAt).fromNow()}</div>
  </div>
</div>
<div class="data">
  <div class="content">
    <span class="author">${news.source.name}</span>
    <h1 class="title">${news.title}</h1>
    <p class="text">${news.description}</p>
    <a href="#" class="button">Read more</a>
  </div>
</div>
</div>
</div>`;
};

const drawFilterBar = (news) => {
  const sources = news
    .map((article) => article)
    .reduce((sources, article) => {
      sources[`${article.source.name}`] = news.filter(
        (test) => test.source.name === article.source.name
      ).length;
      return sources;
    }, {});

  let output = [];
  Object.entries(sources).forEach((source) => {
    output.push(`<div>
    <label for="">${source[0]} (${source[1]})</label><input type="checkbox" name="" id="${source[0]}" checked />
  </div>`);
  });

  return output.join("\n");
};

const createEventListenersFilter = () => {
  const checkboxes = document.querySelectorAll("input[type = checkbox]");
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", (e) => filterNews(e.target.id))
  );
};

const filterNews = (filterOut) => {
  console.log("Source to be filtered out", filterOut);
};
const clearNews = () => {
  const newsSection = document.getElementById("news");
  newsSection.innerHTML = "";
};
const clearFilters = () => {
  const filterSection = document.getElementById("filter-div");
  filterSection.innerHTML = "";
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
  clearNews();
  clearFilters();
  const newsSection = document.getElementById("news");
  const aboveNews = document.getElementById("left-side-menu");
  const outputHtml = document.createElement("div");
  const filterHtml = document.getElementById("filter-div");
  const output = news.map((article) => {
    return drawCard(article);
  });
  outputHtml.innerHTML = output.join("\n");
  newsSection.innerHTML = `<div>Number of results : ${news.length}</div>`;
  newsSection.appendChild(outputHtml);
  filterHtml.innerHTML = drawFilterBar(news);
  createEventListenersFilter();
  aboveNews.appendChild(filterHtml);
};

document.getElementById("business").addEventListener("click", () => {
  update("business");
});
document.getElementById("entertainment").addEventListener("click", () => {
  update("entertainment");
});
document.getElementById("technology").addEventListener("click", () => {
  update("tech");
});
document.getElementById("sports").addEventListener("click", () => {
  update("game");
});
document.getElementById("health").addEventListener("click", () => {
  update("health");
});
update();
