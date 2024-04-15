import { getSystem, getWeatherData, updateWeatherData } from "./util/api";
import {
  calculateMonth,
  calculatePartOfDay,
  calculateWeekDay,
} from "./util/dates";

export default function updateSidebar() {
  const currentWeatherData = getWeatherData().current.current;
  const timeString = new Date().toTimeString().substring(0, 5);

  document.querySelector(".greeting").textContent = `Good ${calculatePartOfDay(
    Number(timeString.substring(0, 2))
  )}, Stranger!`;

  const time = document.querySelector(".datetime .time");
  if (
    time.textContent.substring(3) === "59" &&
    timeString.substring(3) === "00"
  ) {
    updateWeatherData(
      getWeatherData().city,
      getWeatherData().days,
      getWeatherData().hours
    );
  }
  time.textContent = timeString;

  const today = new Date();
  document.querySelector(".datetime .date").textContent = `${calculateWeekDay(
    today.getDay()
  )}, ${calculateMonth(
    today.getMonth()
  )} ${today.getDate()}, ${today.getFullYear()}`;

  document.querySelector(".weather-today .temperature").textContent =
    getSystem() === "imperial"
      ? `${Math.floor(currentWeatherData.temp_f)} °F`
      : `${Math.floor(currentWeatherData.temp_c)} °C`;

  document.querySelector(".weather-today .weather-status").textContent =
    currentWeatherData.condition.text;

  document.querySelector(
    ".weather-today .weather-icon"
  ).src = `https:${currentWeatherData.condition.icon}`;

  document.querySelector(".today-stats .wind-data").textContent =
    getSystem() === "imperial"
      ? `${currentWeatherData.wind_mph} mph`
      : `${currentWeatherData.wind_kph} km/h`;
  document.querySelector(
    ".today-stats .humidity-data"
  ).textContent = `${currentWeatherData.humidity}%`;
  document.querySelector(
    ".today-stats .clouds-data"
  ).textContent = `${currentWeatherData.cloud}%`;
  document.querySelector(".today-stats .pressure-data").textContent =
    getSystem() === "imperial"
      ? `${currentWeatherData.pressure_in} inHg`
      : `${currentWeatherData.pressure_mb} mb`;
}
