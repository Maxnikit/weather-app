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
  console.log(icon);
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
async function getWeather(location) {
  const url = `http://api.weatherapi.com/v1/current.json?key=fdecd8ac16a842419fe232418241602&q=${location}`;
  const response = await fetch(url);
  const data = await response.json();
  processJson(data);
}
getWeather("London");
// Function to handle search bar input change
// function handleSearchInputChange(event) {
//   const searchTerm = event.target.value;
//   console.log(`Search term entered: ${searchTerm}`);
// }

// Function to handle search bar form submission
function handleSearchFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submit action
  const searchTerm = new FormData(event.target).get("search");
  console.log(`Form submitted with search term: ${searchTerm}`);
  // You can call a function here to perform the search operation
  getWeather(searchTerm);
}

// // Event listeners for the search input and form submission
// document
//   .querySelector('input[name="search"]')
//   .addEventListener("change", handleSearchInputChange);
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
  console.log(icon);
  iconDom.src = icon;
}
