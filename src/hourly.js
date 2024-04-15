import { getSystem, getWeatherData } from "./util/api";

export default function updateHourlyBar() {
  const advanceHours = getWeatherData().hours;
  const todayHourlyData =
    getWeatherData().forecast.forecast.forecastday[0].hour;

  const hourString = new Date().toTimeString().substring(0, 2);

  const weatherBar = document.querySelector(".weather-bar.hourly");
  while (weatherBar.hasChildNodes()) {
    weatherBar.removeChild(weatherBar.firstChild);
  }

  for (let i = -advanceHours; i <= advanceHours; i++) {
    const weatherItem = document.createElement("div");
    weatherItem.classList.add("weather-item");
    weatherItem.classList.add(i === 0 ? "page-component" : "hover-animated");

    const hourData = todayHourlyData[Number(hourString) + i];

    weatherItem.innerHTML = `
            <div class="time">${hourData.time.split(" ").pop()}</div>
            <div class="temperature">${
              getSystem() === "imperial"
                ? `${Math.floor(hourData.temp_f)} °F`
                : `${Math.floor(hourData.temp_c)} °C`
            }</div>
            <img src="${
              hourData.condition.icon
            }" alt="Weather Icon" class="weather-icon">
            <div class="weather-status">${hourData.condition.text}</div>
        `;
    weatherBar.appendChild(weatherItem);
  }
}
