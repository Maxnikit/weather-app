import "normalize.css";
import "./style.css";

import clearImage from "./assets/clear.jpg";
import rainyImage from "./assets/rainy.jpg";
import cloudyImage from "./assets/cloudy.jpg";
import sunnyImage from "./assets/sunny.jpg";

const locationDom = document.getElementById("location");
const temperatureDom = document.getElementById("temperature");
const conditionDom = document.getElementById("condition");
const humidityDom = document.getElementById("humidity");
const windDom = document.getElementById("wind");
const pressureDom = document.getElementById("pressure");
const lastUpdatedDom = document.getElementById("lastUpdated");
const iconDom = document.getElementById("icon");

const weatherBackgrounds = [
  { weather: "clear", image: clearImage },
  { weather: "rainy", image: rainyImage },
  { weather: "light rain", image: rainyImage },
  { weather: "cloudy", image: cloudyImage },
  { weather: "partly cloudy", image: cloudyImage },
  { weather: "overcast", image: cloudyImage },
  { weather: "sunny", image: sunnyImage },
];
function setBackground(weather) {
  const weatherLower = weather.toLowerCase();
  const background = weatherBackgrounds.find(
    (wb) => wb.weather === weatherLower
  );
  if (background) {
    document.body.style.backgroundImage = `url(${background.image})`;
  } else {
    console.log(`Invalid weather condition: ${weatherLower}`);
  }
}
function updateResultsDom(
  city,
  country,
  temperature,
  condition,
  humidity,
  wind,
  pressure,
  lastUpdated,
  icon
) {
  locationDom.textContent = ` ${city}, ${country}`;
  temperatureDom.textContent = `Temperature: ${temperature}°C`;
  conditionDom.textContent = condition;
  humidityDom.textContent = `Humidity: ${humidity}%`;
  windDom.textContent = `Wind: ${wind} kph`;
  pressureDom.textContent = `Pressure: ${pressure} mb`;
  lastUpdatedDom.textContent = `Last Updated: ${lastUpdated}`;

  iconDom.src = icon;
  setBackground(condition);
}
function processJson(json) {
  const {
    location: { name: city, country },
    current: {
      temp_c: temperature,
      condition: { text: condition, icon },
      humidity,
      wind_kph: wind,
      pressure_mb: pressure,
      last_updated: lastUpdated,
    },
  } = json;
  console.log(json);
  updateResultsDom(
    city,
    country,
    temperature,
    condition,
    humidity,
    wind,
    pressure,
    lastUpdated,
    icon
  );
}
function handleError(response) {
  if (response.status === 400) {
    const errorMessage = "Invalid city";
    const validationErrorDom = document.getElementById("validationError");
    validationErrorDom.textContent = errorMessage;
    validationErrorDom.style = "display: block";
    setTimeout(() => {
      validationErrorDom.textContent = "";
      validationErrorDom.style = "display: none";
    }, 5000);
  }
}
async function getWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=fdecd8ac16a842419fe232418241602&q=${location}`;
  const response = await fetch(url).catch(handleError);
  console.log(response);
  if (!response.ok) {
    handleError(response);
    return;
  }
  // TODO handle 400 error(invalid input)
  const data = await response.json();
  processJson(data);
}

// Function to handle search bar form submission
function handleSearchFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submit action
  const searchTerm = new FormData(event.target).get("search");

  getWeather(searchTerm);
  event.target.reset(); // Clear the input field after submit
}

document
  .querySelector("form")
  .addEventListener("submit", handleSearchFormSubmit);

getWeather("London");
// getWeather("112312");
