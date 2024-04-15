import { getFormattedDate } from "./dates";

const key = "7e5e9f91269d4e0aa4e145338241104";

let weatherData = {};

let system = "metric";

function getWeatherData() {
  return weatherData;
}

async function updateWeatherData(city, days, hours) {
  let lastCity = weatherData.city;

  weatherData.city = city;
  weatherData.days = days;
  weatherData.hours = hours;

  let currentDataPromise = getCurrentData(city).then((result) => {
    weatherData.current = result;
  });
  let historyDataPromise = getHistoryData(city, days, hours).then((result) => {
    weatherData.history = result;
  });
  let forecastDataPromise = getForecastData(city, days, hours).then(
    (result) => {
      weatherData.forecast = result;
    }
  );

  await Promise.all([
    currentDataPromise,
    historyDataPromise,
    forecastDataPromise,
  ]).catch((error) => {
    weatherData.city = lastCity;
    return new Promise((_, reject) => reject(error));
  });
}

async function getCurrentData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`,
    { mode: "cors" }
  );
  const responseData = await response.json();
  if (responseData.error) {
    console.error(
      `API Error ${responseData.error.code}: ${responseData.error.message}`
    );
    return new Promise((_, reject) => reject(responseData.error));
  }
  return responseData;
}

async function getHistoryData(city) {
  if (weatherData.days < 1) return;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - weatherData.days);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const response = await fetch(
    `https://api.weatherapi.com/v1/history.json?key=${key}&q=${city}&dt=${getFormattedDate(
      startDate
    )}&end_dt=${getFormattedDate(yesterday)}`,
    { mode: "cors" }
  );
  const responseData = await response.json();
  if (responseData.error) {
    console.error(
      `API Error ${responseData.error.code}: ${responseData.error.message}`
    );
    return new Promise((_, reject) => reject(responseData.error));
  }
  return responseData;
}

async function getForecastData(city) {
  if (weatherData.days < 1) return;

  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${
      weatherData.days + 1
    }`,
    { mode: "cors" }
  );

  const responseData = await response.json();
  if (responseData.error) {
    console.error(
      `API Error ${responseData.error.code}: ${responseData.error.message}`
    );
    return new Promise((_, reject) => reject(responseData.error));
  }
  return responseData;
}

async function setCity(city) {
  let lastCity = weatherData.city;

  await updateWeatherData(city, weatherData.days, weatherData.hours)
    .then(() => {
      weatherData.city = city;
    })
    .catch((error) => {
      updateWeatherData(lastCity, weatherData.days, weatherData.hours);
      weatherData.city = lastCity;

      if (error.code === 1006) {
        alert("Invalid location. Please try again!");
      }
    });
}

function getSystem() {
  return system;
}

function setSystem(newSystem) {
  system = newSystem;
}

export { getWeatherData, updateWeatherData, setCity, getSystem, setSystem };
