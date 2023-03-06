function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let cityElement = document.querySelector("#cityInput");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#weatherDescription");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#displayDate");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
}

function search(city) {
  let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  let apiHourUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
  console.log(apiHourUrl);
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let newcity = document.querySelector("#city-NewInput");
  let cityElement = document.querySelector("#cityInput");
  search(newcity.value);
}

let changeCity = document.querySelector("#form");
changeCity.addEventListener("submit", handleSubmit);

let celsiusTemp = null;

function changeToFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = Math.round(celsiusTemp) * (9 / 5) + 32;
  celsiusLink.classList.remove("unitColor");
  farenheitLink.classList.add("unitColor");
  let toFarenheit = document.querySelector("#temperature");
  toFarenheit.innerHTML = Math.round(farenheitTemp);
}

function changeToCelsius(event) {
  event.preventDefault();
  let toCelsius = document.querySelector("#temperature");
  celsiusLink.classList.add("unitColor");
  farenheitLink.classList.remove("unitColor");
  toCelsius.innerHTML = Math.round(celsiusTemp);
}
let farenheitLink = document.querySelector("#farenheitLink");
farenheitLink.addEventListener("click", changeToFarenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", changeToCelsius);

search("Boston");
