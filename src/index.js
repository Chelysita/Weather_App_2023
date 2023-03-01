let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apikey}&units=metric`;
console.log(apiUrl);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#cityInput");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#weatherDescription");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
axios.get(apiUrl).then(displayTemperature);

function search(event) {
  event.preventDefault();
  let newcity = document.querySelector("#city-NewInput");
  let city = document.querySelector("#cityInput");
  city.innerHTML = `${newcity.value}`;
}
let changeCity = document.querySelector("#form");
changeCity.addEventListener("submit", search);

let now = new Date();
let displayDate = document.querySelector("#displayDate");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

displayDate.innerHTML = `${day} ${hours}:${minutes}`;

function changeToFarenheit(event) {
  event.preventDefault();
  let toFarenheit = document.querySelector("#temperature");
  toFarenheit.innerHTML = "30";
}

function changeToCelsius(event) {
  event.preventDefault();
  let toCelsius = document.querySelector("#temperature");
  toCelsius.innerHTML = "12";
}
let farenheitLink = document.querySelector("#farenheitLink");
farenheitLink.addEventListener("click", changeToFarenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", changeToCelsius);
