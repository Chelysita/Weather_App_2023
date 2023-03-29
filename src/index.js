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
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let hours = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "0",
  ];
  return hours[hour];
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayHourForecast(response) {
  let hourForecast = response.data.hourly;
  console.log(hourForecast);
  let hourForecastElement = document.querySelector("#hourForecast");
  let hourForecastHTML = `<div class="row container-fluid">`;

  hourForecast.forEach(function (forecastHour, index) {
    if (index < 5) {
      hourForecastHTML =
        hourForecastHTML +
        ` 
          <div class="col text-center container-fluid">
            <div class="card p-4 text-center container-fluid" " >
              <img src="images/${
                forecastHour.weather[0].icon
              }.png" width="40px" class="align-self-center" alt="..." />
              <h5 class="card-text">${Math.round(forecastHour.temp)}°</h5>

              <small class="text-muted">${formatHour(forecastHour.dt)}</small>
            </div>
          </div>
          
          `;
    }
  });
  hourForecastHTML = hourForecastHTML + `</div>`;
  hourForecastElement.innerHTML = hourForecastHTML;
}

function displayDaysForecast(response) {
  let forecast = response.data.daily;
  let forecastDaysElement = document.querySelector("#daysForecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<ul class="list-group container-fluid">
       <li class="list-group-item">
            <div class="row">
              <div class="col text-start align-self-center">${formatDay(
                forecastDay.dt
              )}</div>
              <div class="col text-center"><img src="images/${
                forecastDay.weather[0].icon
              }.png" width="40px "/></div>
              <div class="col container row d-flex justify-content-end">
                <div class="col-3 low_high">
                  ${Math.round(forecastDay.temp.min)}°
                  <div class="low">LOW</div>
                </div>
                <div class="col-3 low_high">
                  ${Math.round(forecastDay.temp.max)}°
                  <div class="high">HIGH</div>
                </div>
              </div>
            </div>
          </li>
          </ul>`;
    }
  });

  forecastDaysElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayDaysForecast);
  axios.get(apiUrl).then(displayHourForecast);
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

  getForecast(response.data.coord);
}

function search(city) {
  let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
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

search("Boston");
