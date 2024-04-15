import "./style.css";

import { updateWeatherData } from "./util/api";

import updateSidebar from "./sidebar";
import updateLocation from "./location";
import updateHourlyBar from "./hourly";
import updateDailyBar from "./daily";
import setupTopbar from "./topbar";

setupTopbar();

const loadingOverlay = document.querySelector(".loading-overlay");
loadingOverlay.classList.remove("invisible");
updateWeatherData("Geneva", 2, 3).then(() => {
  loadingOverlay.classList.add("invisible");

  updateSidebar();
  updateLocation();
  updateHourlyBar();
  updateDailyBar();
});