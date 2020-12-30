const WEATHER_API_KEY = "4a4960dcc73bfa57e6fcf85ea673c2ae";

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert("Geolocation not supported by this browser");
  }
};

const getWeather = async (position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`;
  const res = await fetch(baseURL);
  const data = await res.json();
  console.log("weather", data);

  let temperature = Math.floor(data.current.temp - 273);
  let condition = data.current.weather[0].description;
  document.getElementById("temp-main").innerText = `${temperature} °C`;
  document.getElementById("condition").innerText = condition;
};

getLocation();
