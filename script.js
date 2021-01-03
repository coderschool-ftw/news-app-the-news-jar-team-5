const API_KEY_JULIEN = "defd19c83e5844bd88287d0bba078e59";
let newsState = [];
let filteredNewsState = [];
let sourcesToFilter = [];
let sourcesFiltered = [];
let pageNumber = 1;

const drawCard = (news) => {
  return `<br><div class="example-2 card">
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
  const sources = newsState
    .map((article) => article)
    .reduce((sources, article) => {
      sources[`${article.source.name}`] = news.filter(
        (test) => test.source.name === article.source.name
      ).length;
      return sources;
      //sources = {Source name 1 : Number of stories, Source name 2 : Number of stories...}
    }, {});
  let output = [];

  // Builds HTML
  // If Source is filtered out (in sourcestoFilter), uncheck
  Object.entries(sources).forEach((source) => {
    output.push(`<div>
    <label for="">${source[0]} (${
      source[1]
    })</label><input type="checkbox"  id="${source[0]}" ${
      sourcesToFilter.includes(source[0]) ? "" : "checked"
    }/>
    </div>`);
  });

  sourcesFiltered = output.join("\n");
  return output.join("\n");
};

// Add Change event listener to all checkboxes
// If checked -> push source in sourcesToFilter
// Else -> Remove source from sourcesToFilter
// Call filternews
const createEventListenersFilter = () => {
  const checkboxes = document.querySelectorAll("input[type = checkbox]");
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", (e) => {
      if (e.target.outerHTML.includes("checked")) {
        sourcesToFilter.push(e.target.id);
      } else {
        sourcesToFilter.splice(sourcesToFilter.indexOf(e.target.id, 1));
      }
      filterNews();
    })
  );
};

// Filters  blacklisted sources out of newsState
// Calls render
const filterNews = () => {
  filteredNewsState = newsState.filter(
    (news) => !sourcesToFilter.includes(news.source.name)
  );
  render(filteredNewsState);
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
    : `https://newsapi.org/v2/top-headlines?country=us&page=${pageNumber}&apiKey=db84944e4adc4398803af0162c647905`;
  const res = await fetch(url);
  const data = await res.json();
  newsState = data.articles;
  render(newsState);
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

document.getElementById("next").addEventListener("click", (e) => {
  pageNumber++;
  update();
});
document.getElementById("previous").addEventListener("click", (e) => {
  pageNumber--;
  update();
});

document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("sidebar-wrapper").classList.toggle("invisible");
});
update();
