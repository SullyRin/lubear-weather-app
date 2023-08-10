let weather = {
  gridania: {
    temp: 19.7,
    humidity: 80,
  },
  "mor dhona": {
    temp: 17.3,
    humidity: 50,
  },
  "limsa lominsa": {
    temp: 30.2,
    humidity: 20,
  },
  ishgard: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");
let cityLowerCase = city.toLowerCase();

if (
  city === "Gridania" ||
  city === "Mor Dhona" ||
  city === "Limsa Lominsa" ||
  city === "Ishgard"
) {
  alert(
    `It is currently ${Math.round(
      weather[cityLowerCase].temp
    )}°C in ${city} with a humidity of ${Math.round(
      weather[cityLowerCase].humidity
    )}`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
