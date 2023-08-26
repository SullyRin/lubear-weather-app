function formatDate(date) {
  let year = date.getFullYear();

  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  return `${day} ${month} ${date.getDate()} ${year}, ${hours}:${minutes}`;
}

let now = new Date();
let formattedDate = formatDate(now);
let timeAndDate = document.querySelector("#time-and-date");
timeAndDate.innerHTML = formattedDate;

function displayWeather(response) {
  let temperature = Math.round(response.data.daily[0].temperature.day);
  let description = response.data.daily[0].condition.description;
  let displayTemperature = document.querySelector("#temperature");
  let displayDescription = document.querySelector("#weather-condition");

  let currentWindSpeed = document.querySelector("#wind-speed");
  let windSpeed = response.data.daily[0].wind.speed;
  currentWindSpeed.innerHTML = `Wind Speed: ${windSpeed}`;

  let currentWeatherIconContainer = document.querySelector("#current-day-icon");
  let currentIconUrl = response.data.daily[0].condition.icon_url;
  currentWeatherIconContainer.innerHTML = `<img src="${currentIconUrl}" alt="${response.data.daily[0].condition.description}" />`;

  let forecastIcons = document.querySelectorAll(".weather-icons .col-2");
  for (let i = 0; i < 5; i++) {
    let iconUrl = response.data.daily[i].condition.icon_url;
    forecastIcons[
      i
    ].innerHTML = `<img src="${iconUrl}" alt="${response.data.daily[i].condition.description}" />`;
  }

  displayTemperature.innerHTML = `${temperature}°`;
  displayDescription.innerHTML = description;
}

function cityInput(event) {
  event.preventDefault();
  let cityNameInput = document.querySelector("#city-input");
  let cityName = cityNameInput.value;
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = cityName;

  let apiKey = "075f960bactbdbob9adb874ff63e3e05";
  let query = cityName;
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}`;
  // let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  // let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(displayWeather);
}

let changeCity = document.querySelector("#city-form");
changeCity.addEventListener("submit", cityInput);

function handlePosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);

  let apiKey = "075f960bactbdbob9adb874ff63e3e05";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  //  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  // let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";

  axios.get(url).then((response) => {
    let cityNameElement = document.querySelector("#city-name");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#weather-condition");

    cityNameElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = `${Math.round(
      response.data.temperature.current
    )}°`;
    descriptionElement.innerHTML = response.data.condition.description;
  });
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentPositionButton = document.querySelector("#current-location");
currentPositionButton.addEventListener("click", getCurrentLocation);

// function changeTempUnit(event) {
//  event.preventDefault();
//  let TempInF = document.querySelector("#c-to-f");

//  if (TempInF.textContent === "18°") {
//    TempInF.innerHTML = "64°";
//  } else {
//    TempInF.innerHTML = "18°";
//  }
// }

// let convertToFahrenheit = document.querySelector("#temperature");
// convertToFahrenheit.addEventListener("click", changeTempUnit);
