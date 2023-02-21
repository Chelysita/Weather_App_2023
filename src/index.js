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
