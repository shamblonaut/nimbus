import { getSystem, getWeatherData } from "./util/api";
import { calculateMonth } from "./util/dates";

export default function updateDailyBar() {
  const advanceDays = getWeatherData().days;
  const historyData = getWeatherData().history.forecast.forecastday;
  const forecastData = getWeatherData().forecast.forecast.forecastday;

  const weatherBar = document.querySelector(".weather-bar.daily");
  while (weatherBar.hasChildNodes()) {
    weatherBar.removeChild(weatherBar.firstChild);
  }

  for (let i = 0; i < advanceDays * 2 + 1; i++) {
    let data = i < advanceDays ? historyData[i] : forecastData[i - advanceDays];

    const weatherItem = document.createElement("div");
    weatherItem.classList.add("weather-item");
    weatherItem.classList.add(
      i === advanceDays ? "page-component" : "hover-animated"
    );

    const date = data.date.split("-");
    weatherItem.innerHTML = `
        <div class="date">${calculateMonth(Number(date[1]) - 1)} ${date[2]}</div>
        <div class="temperature">${
          getSystem() === "imperial"
            ? `${Math.floor(data.day.avgtemp_f)} °F`
            : `${Math.floor(data.day.avgtemp_c)} °C`
        }</div>
        <img src="${
          data.day.condition.icon
        }" alt="Weather Icon" class="weather-icon">
        <div class="weather-status">${data.day.condition.text}</div>
    `;
    weatherBar.appendChild(weatherItem);
  }
}
