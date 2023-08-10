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

  return `${day} ${month} ${date.getDate()} ${year}, ${hours}:${minutes} Eorzea Time`;
}

let now = new Date();
let formattedDate = formatDate(now);
let timeAndDate = document.querySelector("#time-and-date");
timeAndDate.innerHTML = formattedDate;

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  //  console.log(`Temperature received: ${temperature}°C`);
  let displayTemperature = document.querySelector("#temperature");
  let displayDescription = document.querySelector("#weather-condition");

  displayTemperature.innerHTML = `${temperature}°`;
  displayDescription.innerHTML = description;
}

function cityInput(event) {
  event.preventDefault();
  let cityNameInput = document.querySelector("#city-input");
  let cityName = cityNameInput.value;
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = cityName;

  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let city = cityName;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(displayWeather);
}

let changeCity = document.querySelector("#city-form");
changeCity.addEventListener("submit", cityInput);

function handlePosition(position) {
  // console.log(position.coords.latitude);
  // console.log(position.coords.longitude);

  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then((response) => {
    let cityNameElement = document.querySelector("#city-name");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#weather-condition");

    cityNameElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
    descriptionElement.innerHTML = response.data.weather[0].description;
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
