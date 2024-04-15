import { getWeatherData } from "./util/api";

export default function updateLocation() {
  const city = getWeatherData().current.location.name;
  const region = getWeatherData().current.location.region;
  const country = getWeatherData().current.location.country;
  document.querySelector(".city").textContent = city;
  document.querySelector(".region").textContent = `${
    region ? region + ", " : ""
  }${country}`;
}
