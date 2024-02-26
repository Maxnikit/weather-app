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
  const url = `http://api.weatherapi.com/v1/current.json?key=fdecd8ac16a842419fe232418241602&q=${location}`;
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
const weatherBackgrounds = [
  { weather: "clear", image: "./assets/clear.jpg" },
  { weather: "rainy", image: "./assets/rainy.jpg" },
  { weather: "light rain", image: "./assets/rainy.jpg" },
  { weather: "cloudy", image: "./assets/cloudy.jpg" },
  { weather: "partly cloudy", image: "./assets/cloudy.jpg" },
  { weather: "overcast", image: "./assets/cloudy.jpg" },
  { weather: "sunny", image: "./assets/sunny.jpg" },
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

getWeather("London");
// getWeather("112312");
