import "normalize.css";
import "./style.css";

const locationDom = document.getElementById("location");
const temperatureDom = document.getElementById("temperature");
const conditionDom = document.getElementById("condition");
const humidityDom = document.getElementById("humidity");
const windDom = document.getElementById("wind");
const pressureDom = document.getElementById("pressure");
const lastUpdatedDom = document.getElementById("lastUpdated");
const iconDom = document.getElementById("icon");

const bodyDom = document.querySelector("body");
bodyDom.style.backgroundImage =
  "url(./assets/mihai-moisa-bw2MjdMZeSY-unsplash.jpg)";
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
function handleError(error) {
  console.log(error);
}
async function getWeather(location) {
  const url = `http://api.weatherapi.com/v1/current.json?key=fdecd8ac16a842419fe232418241602&q=${location}`;
  const response = await fetch(url).catch(handleError);
  console.log(response);
  if (response.status === 400) {
  }
  // TODO handle 400 error(invalid input)
  const data = await response.json();
  processJson(data);
}
getWeather("London");

// Function to handle search bar form submission
function handleSearchFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submit action
  const searchTerm = new FormData(event.target).get("search");
  // You can call a function here to perform the search operation
  getWeather(searchTerm);
}

document
  .querySelector("form")
  .addEventListener("submit", handleSearchFormSubmit);

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
  locationDom.textContent = `Location: ${city}, ${country}`;
  temperatureDom.textContent = `${temperature}°C`;
  conditionDom.textContent = condition;
  humidityDom.textContent = `Humidity: ${humidity}%`;
  windDom.textContent = `Wind: ${wind} kph`;
  pressureDom.textContent = `Pressure: ${pressure} mb`;
  lastUpdatedDom.textContent = `Last Updated: ${lastUpdated}`;

  iconDom.src = icon;
  setBackground(condition);
}

function setBackground(weather) {
  if (weather === "Clear") {
    bodyDom.style.backgroundImage = "url(./assets/clear.jpg)";
  }
}
