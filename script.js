const API_KEY_JULIEN = "db84944e4adc4398803af0162c647905";

const update = async () => {
  const url =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=db84944e4adc4398803af0162c647905";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.articles);
  render(data.articles);
};

const render = (news) => {
  document.getElementById("news").innerHTML = `<div class="card">
  <img src="${news[0].urlToImage}" alt="img" class="card-img-top">
  <h5>${news[0].title}</h5></div>
  <p>${news[0].description}</p>`;
};
update();
