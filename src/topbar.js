import updateDailyBar from "./daily";
import updateHourlyBar from "./hourly";
import updateLocation from "./location";
import updateSidebar from "./sidebar";
import { setCity, setSystem } from "./util/api";

export default async function setupTopbar() {
  const unitSelector = document.querySelector("#unit-select");
  setSystem(unitSelector.value);
  unitSelector.addEventListener("change", () => {
    setSystem(unitSelector.value);

    updateSidebar();
    updateHourlyBar();
    updateDailyBar();
  });

  const searchBar = document.querySelector(".searchbar");
  searchBar.addEventListener("keydown", (event) => {
    if (!event.repeated && event.key === "Enter") submitCity();
  });

  const searchButton = document.querySelector(".search-btn");
  searchButton.addEventListener("click", submitCity);
}

async function submitCity() {
  const searchBar = document.querySelector(".searchbar");

  if (searchBar.value === "") return;

  const loadingOverlay = document.querySelector(".loading-overlay");

  try {
    loadingOverlay.classList.remove("invisible");
    await setCity(searchBar.value);
    searchBar.value = "";
  } catch (error) {
    alert(error.message);
    loadingOverlay.classList.add("invisible");
    return;
  }

  updateLocation();
  updateSidebar();
  updateHourlyBar();
  updateDailyBar();
  loadingOverlay.classList.add("invisible");
}
