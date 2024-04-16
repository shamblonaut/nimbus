/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/daily.js":
/*!**********************!*\
  !*** ./src/daily.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ updateDailyBar; }
/* harmony export */ });
/* harmony import */ var _util_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/api */ "./src/util/api.js");
/* harmony import */ var _util_dates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/dates */ "./src/util/dates.js");


function updateDailyBar() {
  const advanceDays = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().days;
  const historyData = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().history.forecast.forecastday;
  const forecastData = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().forecast.forecast.forecastday;
  const weatherBar = document.querySelector(".weather-bar.daily");
  while (weatherBar.hasChildNodes()) {
    weatherBar.removeChild(weatherBar.firstChild);
  }
  for (let i = 0; i < advanceDays * 2 + 1; i++) {
    let data = i < advanceDays ? historyData[i] : forecastData[i - advanceDays];
    const weatherItem = document.createElement("div");
    weatherItem.classList.add("weather-item");
    weatherItem.classList.add(i === advanceDays ? "page-component" : "hover-animated");
    const date = data.date.split("-");
    weatherItem.innerHTML = `
        <div class="date">${(0,_util_dates__WEBPACK_IMPORTED_MODULE_1__.calculateMonth)(Number(date[1]) - 1)} ${date[2]}</div>
        <div class="temperature">${(0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getSystem)() === "imperial" ? `${Math.floor(data.day.avgtemp_f)} °F` : `${Math.floor(data.day.avgtemp_c)} °C`}</div>
        <img src="${data.day.condition.icon}" alt="Weather Icon" class="weather-icon">
        <div class="weather-status">${data.day.condition.text}</div>
    `;
    weatherBar.appendChild(weatherItem);
  }
}

/***/ }),

/***/ "./src/hourly.js":
/*!***********************!*\
  !*** ./src/hourly.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ updateHourlyBar; }
/* harmony export */ });
/* harmony import */ var _util_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/api */ "./src/util/api.js");

function updateHourlyBar() {
  const advanceHours = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().hours;
  const todayHourlyData = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().forecast.forecast.forecastday[0].hour;
  const hourString = new Date().toTimeString().substring(0, 2);
  const weatherBar = document.querySelector(".weather-bar.hourly");
  while (weatherBar.hasChildNodes()) {
    weatherBar.removeChild(weatherBar.firstChild);
  }
  for (let i = -advanceHours; i <= advanceHours; i++) {
    const weatherItem = document.createElement("div");
    weatherItem.classList.add("weather-item");
    weatherItem.classList.add(i === 0 ? "page-component" : "hover-animated");
    const hour = Number(hourString);
    let relativeIndex = hour + i;
    let hourData;
    if (hour < advanceHours && relativeIndex < 0) {
      hourData = todayHourlyData[24 + relativeIndex];
    } else if (hour >= 24 - advanceHours) {
      hourData = todayHourlyData[relativeIndex - 24];
    } else {
      hourData = todayHourlyData[relativeIndex];
    }
    weatherItem.innerHTML = `
            <div class="time">${hourData.time.split(" ").pop()}</div>
            <div class="temperature">${(0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getSystem)() === "imperial" ? `${Math.floor(hourData.temp_f)} °F` : `${Math.floor(hourData.temp_c)} °C`}</div>
            <img src="${hourData.condition.icon}" alt="Weather Icon" class="weather-icon">
            <div class="weather-status">${hourData.condition.text}</div>
        `;
    weatherBar.appendChild(weatherItem);
  }
}

/***/ }),

/***/ "./src/location.js":
/*!*************************!*\
  !*** ./src/location.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ updateLocation; }
/* harmony export */ });
/* harmony import */ var _util_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/api */ "./src/util/api.js");

function updateLocation() {
  const city = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().current.location.name;
  const region = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().current.location.region;
  const country = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().current.location.country;
  document.querySelector(".city").textContent = city;
  document.querySelector(".region").textContent = `${region ? region + ", " : ""}${country}`;
}

/***/ }),

/***/ "./src/sidebar.js":
/*!************************!*\
  !*** ./src/sidebar.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ updateSidebar; }
/* harmony export */ });
/* harmony import */ var _util_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/api */ "./src/util/api.js");
/* harmony import */ var _util_dates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/dates */ "./src/util/dates.js");


function updateSidebar() {
  const currentWeatherData = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().current.current;
  const timeString = new Date().toTimeString().substring(0, 5);
  document.querySelector(".greeting").textContent = `Good ${(0,_util_dates__WEBPACK_IMPORTED_MODULE_1__.calculatePartOfDay)(Number(timeString.substring(0, 2)))}, Stranger!`;
  const time = document.querySelector(".datetime .time");
  if (time.textContent.substring(3) === "59" && timeString.substring(3) === "00") {
    (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.updateWeatherData)((0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().city, (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().days, (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)().hours);
  }
  time.textContent = timeString;
  const today = new Date();
  document.querySelector(".datetime .date").textContent = `${(0,_util_dates__WEBPACK_IMPORTED_MODULE_1__.calculateWeekDay)(today.getDay())}, ${(0,_util_dates__WEBPACK_IMPORTED_MODULE_1__.calculateMonth)(today.getMonth())} ${today.getDate()}, ${today.getFullYear()}`;
  document.querySelector(".weather-today .temperature").textContent = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getSystem)() === "imperial" ? `${Math.floor(currentWeatherData.temp_f)} °F` : `${Math.floor(currentWeatherData.temp_c)} °C`;
  document.querySelector(".weather-today .weather-status").textContent = currentWeatherData.condition.text;
  document.querySelector(".weather-today .weather-icon").src = `https:${currentWeatherData.condition.icon}`;
  document.querySelector(".today-stats .wind-data").textContent = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getSystem)() === "imperial" ? `${currentWeatherData.wind_mph} mph` : `${currentWeatherData.wind_kph} km/h`;
  document.querySelector(".today-stats .humidity-data").textContent = `${currentWeatherData.humidity}%`;
  document.querySelector(".today-stats .clouds-data").textContent = `${currentWeatherData.cloud}%`;
  document.querySelector(".today-stats .pressure-data").textContent = (0,_util_api__WEBPACK_IMPORTED_MODULE_0__.getSystem)() === "imperial" ? `${currentWeatherData.pressure_in} inHg` : `${currentWeatherData.pressure_mb} mb`;
}

/***/ }),

/***/ "./src/topbar.js":
/*!***********************!*\
  !*** ./src/topbar.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ setupTopbar; }
/* harmony export */ });
/* harmony import */ var _daily__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./daily */ "./src/daily.js");
/* harmony import */ var _hourly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hourly */ "./src/hourly.js");
/* harmony import */ var _location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./location */ "./src/location.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar */ "./src/sidebar.js");
/* harmony import */ var _util_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/api */ "./src/util/api.js");





async function setupTopbar() {
  const unitSelector = document.querySelector("#unit-select");
  (0,_util_api__WEBPACK_IMPORTED_MODULE_4__.setSystem)(unitSelector.value);
  unitSelector.addEventListener("change", () => {
    (0,_util_api__WEBPACK_IMPORTED_MODULE_4__.setSystem)(unitSelector.value);
    (0,_sidebar__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_hourly__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_daily__WEBPACK_IMPORTED_MODULE_0__["default"])();
  });
  const searchBar = document.querySelector(".searchbar");
  searchBar.addEventListener("keydown", event => {
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
    await (0,_util_api__WEBPACK_IMPORTED_MODULE_4__.setCity)(searchBar.value);
    searchBar.value = "";
  } catch (error) {
    alert(error.message);
    loadingOverlay.classList.add("invisible");
    return;
  }
  (0,_location__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_sidebar__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_hourly__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_daily__WEBPACK_IMPORTED_MODULE_0__["default"])();
  loadingOverlay.classList.add("invisible");
}

/***/ }),

/***/ "./src/util/api.js":
/*!*************************!*\
  !*** ./src/util/api.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSystem: function() { return /* binding */ getSystem; },
/* harmony export */   getWeatherData: function() { return /* binding */ getWeatherData; },
/* harmony export */   setCity: function() { return /* binding */ setCity; },
/* harmony export */   setSystem: function() { return /* binding */ setSystem; },
/* harmony export */   updateWeatherData: function() { return /* binding */ updateWeatherData; }
/* harmony export */ });
/* harmony import */ var _dates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dates */ "./src/util/dates.js");

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
  let currentDataPromise = getCurrentData(city).then(result => {
    weatherData.current = result;
  });
  let historyDataPromise = getHistoryData(city, days, hours).then(result => {
    weatherData.history = result;
  });
  let forecastDataPromise = getForecastData(city, days, hours).then(result => {
    weatherData.forecast = result;
  });
  await Promise.all([currentDataPromise, historyDataPromise, forecastDataPromise]).catch(error => {
    weatherData.city = lastCity;
    return new Promise((_, reject) => reject(error));
  });
}
async function getCurrentData(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`, {
    mode: "cors"
  });
  const responseData = await response.json();
  if (responseData.error) {
    console.error(`API Error ${responseData.error.code}: ${responseData.error.message}`);
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
  const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=${key}&q=${city}&dt=${(0,_dates__WEBPACK_IMPORTED_MODULE_0__.getFormattedDate)(startDate)}&end_dt=${(0,_dates__WEBPACK_IMPORTED_MODULE_0__.getFormattedDate)(yesterday)}`, {
    mode: "cors"
  });
  const responseData = await response.json();
  if (responseData.error) {
    console.error(`API Error ${responseData.error.code}: ${responseData.error.message}`);
    return new Promise((_, reject) => reject(responseData.error));
  }
  return responseData;
}
async function getForecastData(city) {
  if (weatherData.days < 1) return;
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${weatherData.days + 1}`, {
    mode: "cors"
  });
  const responseData = await response.json();
  if (responseData.error) {
    console.error(`API Error ${responseData.error.code}: ${responseData.error.message}`);
    return new Promise((_, reject) => reject(responseData.error));
  }
  return responseData;
}
async function setCity(city) {
  let lastCity = weatherData.city;
  await updateWeatherData(city, weatherData.days, weatherData.hours).then(() => {
    weatherData.city = city;
  }).catch(error => {
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


/***/ }),

/***/ "./src/util/dates.js":
/*!***************************!*\
  !*** ./src/util/dates.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateMonth: function() { return /* binding */ calculateMonth; },
/* harmony export */   calculatePartOfDay: function() { return /* binding */ calculatePartOfDay; },
/* harmony export */   calculateWeekDay: function() { return /* binding */ calculateWeekDay; },
/* harmony export */   getFormattedDate: function() { return /* binding */ getFormattedDate; }
/* harmony export */ });
function getFormattedDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
function calculatePartOfDay(hour) {
  if (hour >= 0 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 18) return "Afternoon";else return "Evening";
}
function calculateWeekDay(index) {
  return isNaN(index) ? null : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index];
}
function calculateMonth(index) {
  let short = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (isNaN(index)) return null;
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][index];
  if (short) return month.substring(0, 3);else return month;
}


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _util_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/api */ "./src/util/api.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar */ "./src/sidebar.js");
/* harmony import */ var _location__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./location */ "./src/location.js");
/* harmony import */ var _hourly__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hourly */ "./src/hourly.js");
/* harmony import */ var _daily__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./daily */ "./src/daily.js");
/* harmony import */ var _topbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./topbar */ "./src/topbar.js");







(0,_topbar__WEBPACK_IMPORTED_MODULE_6__["default"])();
const loadingOverlay = document.querySelector(".loading-overlay");
loadingOverlay.classList.remove("invisible");
(0,_util_api__WEBPACK_IMPORTED_MODULE_1__.updateWeatherData)("Geneva", 2, 3).then(() => {
  loadingOverlay.classList.add("invisible");
  (0,_sidebar__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_location__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_hourly__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_daily__WEBPACK_IMPORTED_MODULE_5__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L25pbWJ1cy8uL3NyYy9ob3VybHkuanMiLCJ3ZWJwYWNrOi8vbmltYnVzLy4vc3JjL2xvY2F0aW9uLmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy9zaWRlYmFyLmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy90b3BiYXIuanMiLCJ3ZWJwYWNrOi8vbmltYnVzLy4vc3JjL3V0aWwvYXBpLmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy91dGlsL2RhdGVzLmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9uaW1idXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmltYnVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uaW1idXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uaW1idXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uaW1idXMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U3lzdGVtLCBnZXRXZWF0aGVyRGF0YSB9IGZyb20gXCIuL3V0aWwvYXBpXCI7XG5pbXBvcnQgeyBjYWxjdWxhdGVNb250aCB9IGZyb20gXCIuL3V0aWwvZGF0ZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlRGFpbHlCYXIoKSB7XG4gIGNvbnN0IGFkdmFuY2VEYXlzID0gZ2V0V2VhdGhlckRhdGEoKS5kYXlzO1xuICBjb25zdCBoaXN0b3J5RGF0YSA9IGdldFdlYXRoZXJEYXRhKCkuaGlzdG9yeS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcbiAgY29uc3QgZm9yZWNhc3REYXRhID0gZ2V0V2VhdGhlckRhdGEoKS5mb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheTtcblxuICBjb25zdCB3ZWF0aGVyQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWJhci5kYWlseVwiKTtcbiAgd2hpbGUgKHdlYXRoZXJCYXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgd2VhdGhlckJhci5yZW1vdmVDaGlsZCh3ZWF0aGVyQmFyLmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZHZhbmNlRGF5cyAqIDIgKyAxOyBpKyspIHtcbiAgICBsZXQgZGF0YSA9IGkgPCBhZHZhbmNlRGF5cyA/IGhpc3RvcnlEYXRhW2ldIDogZm9yZWNhc3REYXRhW2kgLSBhZHZhbmNlRGF5c107XG5cbiAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgd2VhdGhlckl0ZW0uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaXRlbVwiKTtcbiAgICB3ZWF0aGVySXRlbS5jbGFzc0xpc3QuYWRkKFxuICAgICAgaSA9PT0gYWR2YW5jZURheXMgPyBcInBhZ2UtY29tcG9uZW50XCIgOiBcImhvdmVyLWFuaW1hdGVkXCJcbiAgICApO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRhdGEuZGF0ZS5zcGxpdChcIi1cIik7XG4gICAgd2VhdGhlckl0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZVwiPiR7Y2FsY3VsYXRlTW9udGgoTnVtYmVyKGRhdGVbMV0pIC0gMSl9ICR7ZGF0ZVsyXX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRlbXBlcmF0dXJlXCI+JHtcbiAgICAgICAgICBnZXRTeXN0ZW0oKSA9PT0gXCJpbXBlcmlhbFwiXG4gICAgICAgICAgICA/IGAke01hdGguZmxvb3IoZGF0YS5kYXkuYXZndGVtcF9mKX0gwrBGYFxuICAgICAgICAgICAgOiBgJHtNYXRoLmZsb29yKGRhdGEuZGF5LmF2Z3RlbXBfYyl9IMKwQ2BcbiAgICAgICAgfTwvZGl2PlxuICAgICAgICA8aW1nIHNyYz1cIiR7XG4gICAgICAgICAgZGF0YS5kYXkuY29uZGl0aW9uLmljb25cbiAgICAgICAgfVwiIGFsdD1cIldlYXRoZXIgSWNvblwiIGNsYXNzPVwid2VhdGhlci1pY29uXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWF0aGVyLXN0YXR1c1wiPiR7ZGF0YS5kYXkuY29uZGl0aW9uLnRleHR9PC9kaXY+XG4gICAgYDtcbiAgICB3ZWF0aGVyQmFyLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0U3lzdGVtLCBnZXRXZWF0aGVyRGF0YSB9IGZyb20gXCIuL3V0aWwvYXBpXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZUhvdXJseUJhcigpIHtcbiAgY29uc3QgYWR2YW5jZUhvdXJzID0gZ2V0V2VhdGhlckRhdGEoKS5ob3VycztcbiAgY29uc3QgdG9kYXlIb3VybHlEYXRhID1cbiAgICBnZXRXZWF0aGVyRGF0YSgpLmZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXI7XG5cbiAgY29uc3QgaG91clN0cmluZyA9IG5ldyBEYXRlKCkudG9UaW1lU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDIpO1xuXG4gIGNvbnN0IHdlYXRoZXJCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItYmFyLmhvdXJseVwiKTtcbiAgd2hpbGUgKHdlYXRoZXJCYXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgd2VhdGhlckJhci5yZW1vdmVDaGlsZCh3ZWF0aGVyQmFyLmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IC1hZHZhbmNlSG91cnM7IGkgPD0gYWR2YW5jZUhvdXJzOyBpKyspIHtcbiAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgd2VhdGhlckl0ZW0uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaXRlbVwiKTtcbiAgICB3ZWF0aGVySXRlbS5jbGFzc0xpc3QuYWRkKGkgPT09IDAgPyBcInBhZ2UtY29tcG9uZW50XCIgOiBcImhvdmVyLWFuaW1hdGVkXCIpO1xuXG4gICAgY29uc3QgaG91ciA9IE51bWJlcihob3VyU3RyaW5nKTtcbiAgICBsZXQgcmVsYXRpdmVJbmRleCA9IGhvdXIgKyBpO1xuXG4gICAgbGV0IGhvdXJEYXRhO1xuICAgIGlmIChob3VyIDwgYWR2YW5jZUhvdXJzICYmIHJlbGF0aXZlSW5kZXggPCAwKSB7XG4gICAgICBob3VyRGF0YSA9IHRvZGF5SG91cmx5RGF0YVsyNCArIHJlbGF0aXZlSW5kZXhdO1xuICAgIH0gZWxzZSBpZiAoaG91ciA+PSAyNCAtIGFkdmFuY2VIb3Vycykge1xuICAgICAgaG91ckRhdGEgPSB0b2RheUhvdXJseURhdGFbcmVsYXRpdmVJbmRleCAtIDI0XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaG91ckRhdGEgPSB0b2RheUhvdXJseURhdGFbcmVsYXRpdmVJbmRleF07XG4gICAgfVxuXG4gICAgd2VhdGhlckl0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWVcIj4ke2hvdXJEYXRhLnRpbWUuc3BsaXQoXCIgXCIpLnBvcCgpfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlbXBlcmF0dXJlXCI+JHtcbiAgICAgICAgICAgICAgZ2V0U3lzdGVtKCkgPT09IFwiaW1wZXJpYWxcIlxuICAgICAgICAgICAgICAgID8gYCR7TWF0aC5mbG9vcihob3VyRGF0YS50ZW1wX2YpfSDCsEZgXG4gICAgICAgICAgICAgICAgOiBgJHtNYXRoLmZsb29yKGhvdXJEYXRhLnRlbXBfYyl9IMKwQ2BcbiAgICAgICAgICAgIH08L2Rpdj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtcbiAgICAgICAgICAgICAgaG91ckRhdGEuY29uZGl0aW9uLmljb25cbiAgICAgICAgICAgIH1cIiBhbHQ9XCJXZWF0aGVyIEljb25cIiBjbGFzcz1cIndlYXRoZXItaWNvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYXRoZXItc3RhdHVzXCI+JHtob3VyRGF0YS5jb25kaXRpb24udGV4dH08L2Rpdj5cbiAgICAgICAgYDtcbiAgICB3ZWF0aGVyQmFyLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0V2VhdGhlckRhdGEgfSBmcm9tIFwiLi91dGlsL2FwaVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1cGRhdGVMb2NhdGlvbigpIHtcbiAgY29uc3QgY2l0eSA9IGdldFdlYXRoZXJEYXRhKCkuY3VycmVudC5sb2NhdGlvbi5uYW1lO1xuICBjb25zdCByZWdpb24gPSBnZXRXZWF0aGVyRGF0YSgpLmN1cnJlbnQubG9jYXRpb24ucmVnaW9uO1xuICBjb25zdCBjb3VudHJ5ID0gZ2V0V2VhdGhlckRhdGEoKS5jdXJyZW50LmxvY2F0aW9uLmNvdW50cnk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2l0eVwiKS50ZXh0Q29udGVudCA9IGNpdHk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVnaW9uXCIpLnRleHRDb250ZW50ID0gYCR7XG4gICAgcmVnaW9uID8gcmVnaW9uICsgXCIsIFwiIDogXCJcIlxuICB9JHtjb3VudHJ5fWA7XG59XG4iLCJpbXBvcnQgeyBnZXRTeXN0ZW0sIGdldFdlYXRoZXJEYXRhLCB1cGRhdGVXZWF0aGVyRGF0YSB9IGZyb20gXCIuL3V0aWwvYXBpXCI7XG5pbXBvcnQge1xuICBjYWxjdWxhdGVNb250aCxcbiAgY2FsY3VsYXRlUGFydE9mRGF5LFxuICBjYWxjdWxhdGVXZWVrRGF5LFxufSBmcm9tIFwiLi91dGlsL2RhdGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZVNpZGViYXIoKSB7XG4gIGNvbnN0IGN1cnJlbnRXZWF0aGVyRGF0YSA9IGdldFdlYXRoZXJEYXRhKCkuY3VycmVudC5jdXJyZW50O1xuICBjb25zdCB0aW1lU3RyaW5nID0gbmV3IERhdGUoKS50b1RpbWVTdHJpbmcoKS5zdWJzdHJpbmcoMCwgNSk7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmVldGluZ1wiKS50ZXh0Q29udGVudCA9IGBHb29kICR7Y2FsY3VsYXRlUGFydE9mRGF5KFxuICAgIE51bWJlcih0aW1lU3RyaW5nLnN1YnN0cmluZygwLCAyKSlcbiAgKX0sIFN0cmFuZ2VyIWA7XG5cbiAgY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZXRpbWUgLnRpbWVcIik7XG4gIGlmIChcbiAgICB0aW1lLnRleHRDb250ZW50LnN1YnN0cmluZygzKSA9PT0gXCI1OVwiICYmXG4gICAgdGltZVN0cmluZy5zdWJzdHJpbmcoMykgPT09IFwiMDBcIlxuICApIHtcbiAgICB1cGRhdGVXZWF0aGVyRGF0YShcbiAgICAgIGdldFdlYXRoZXJEYXRhKCkuY2l0eSxcbiAgICAgIGdldFdlYXRoZXJEYXRhKCkuZGF5cyxcbiAgICAgIGdldFdlYXRoZXJEYXRhKCkuaG91cnNcbiAgICApO1xuICB9XG4gIHRpbWUudGV4dENvbnRlbnQgPSB0aW1lU3RyaW5nO1xuXG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRldGltZSAuZGF0ZVwiKS50ZXh0Q29udGVudCA9IGAke2NhbGN1bGF0ZVdlZWtEYXkoXG4gICAgdG9kYXkuZ2V0RGF5KClcbiAgKX0sICR7Y2FsY3VsYXRlTW9udGgoXG4gICAgdG9kYXkuZ2V0TW9udGgoKVxuICApfSAke3RvZGF5LmdldERhdGUoKX0sICR7dG9kYXkuZ2V0RnVsbFllYXIoKX1gO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci10b2RheSAudGVtcGVyYXR1cmVcIikudGV4dENvbnRlbnQgPVxuICAgIGdldFN5c3RlbSgpID09PSBcImltcGVyaWFsXCJcbiAgICAgID8gYCR7TWF0aC5mbG9vcihjdXJyZW50V2VhdGhlckRhdGEudGVtcF9mKX0gwrBGYFxuICAgICAgOiBgJHtNYXRoLmZsb29yKGN1cnJlbnRXZWF0aGVyRGF0YS50ZW1wX2MpfSDCsENgO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci10b2RheSAud2VhdGhlci1zdGF0dXNcIikudGV4dENvbnRlbnQgPVxuICAgIGN1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb24udGV4dDtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLndlYXRoZXItdG9kYXkgLndlYXRoZXItaWNvblwiXG4gICkuc3JjID0gYGh0dHBzOiR7Y3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbi5pY29ufWA7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RheS1zdGF0cyAud2luZC1kYXRhXCIpLnRleHRDb250ZW50ID1cbiAgICBnZXRTeXN0ZW0oKSA9PT0gXCJpbXBlcmlhbFwiXG4gICAgICA/IGAke2N1cnJlbnRXZWF0aGVyRGF0YS53aW5kX21waH0gbXBoYFxuICAgICAgOiBgJHtjdXJyZW50V2VhdGhlckRhdGEud2luZF9rcGh9IGttL2hgO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnRvZGF5LXN0YXRzIC5odW1pZGl0eS1kYXRhXCJcbiAgKS50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRXZWF0aGVyRGF0YS5odW1pZGl0eX0lYDtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi50b2RheS1zdGF0cyAuY2xvdWRzLWRhdGFcIlxuICApLnRleHRDb250ZW50ID0gYCR7Y3VycmVudFdlYXRoZXJEYXRhLmNsb3VkfSVgO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZGF5LXN0YXRzIC5wcmVzc3VyZS1kYXRhXCIpLnRleHRDb250ZW50ID1cbiAgICBnZXRTeXN0ZW0oKSA9PT0gXCJpbXBlcmlhbFwiXG4gICAgICA/IGAke2N1cnJlbnRXZWF0aGVyRGF0YS5wcmVzc3VyZV9pbn0gaW5IZ2BcbiAgICAgIDogYCR7Y3VycmVudFdlYXRoZXJEYXRhLnByZXNzdXJlX21ifSBtYmA7XG59XG4iLCJpbXBvcnQgdXBkYXRlRGFpbHlCYXIgZnJvbSBcIi4vZGFpbHlcIjtcbmltcG9ydCB1cGRhdGVIb3VybHlCYXIgZnJvbSBcIi4vaG91cmx5XCI7XG5pbXBvcnQgdXBkYXRlTG9jYXRpb24gZnJvbSBcIi4vbG9jYXRpb25cIjtcbmltcG9ydCB1cGRhdGVTaWRlYmFyIGZyb20gXCIuL3NpZGViYXJcIjtcbmltcG9ydCB7IHNldENpdHksIHNldFN5c3RlbSB9IGZyb20gXCIuL3V0aWwvYXBpXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHNldHVwVG9wYmFyKCkge1xuICBjb25zdCB1bml0U2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VuaXQtc2VsZWN0XCIpO1xuICBzZXRTeXN0ZW0odW5pdFNlbGVjdG9yLnZhbHVlKTtcbiAgdW5pdFNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgIHNldFN5c3RlbSh1bml0U2VsZWN0b3IudmFsdWUpO1xuXG4gICAgdXBkYXRlU2lkZWJhcigpO1xuICAgIHVwZGF0ZUhvdXJseUJhcigpO1xuICAgIHVwZGF0ZURhaWx5QmFyKCk7XG4gIH0pO1xuXG4gIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoYmFyXCIpO1xuICBzZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKCFldmVudC5yZXBlYXRlZCAmJiBldmVudC5rZXkgPT09IFwiRW50ZXJcIikgc3VibWl0Q2l0eSgpO1xuICB9KTtcblxuICBjb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1idG5cIik7XG4gIHNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3VibWl0Q2l0eSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN1Ym1pdENpdHkoKSB7XG4gIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoYmFyXCIpO1xuXG4gIGlmIChzZWFyY2hCYXIudmFsdWUgPT09IFwiXCIpIHJldHVybjtcblxuICBjb25zdCBsb2FkaW5nT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGluZy1vdmVybGF5XCIpO1xuXG4gIHRyeSB7XG4gICAgbG9hZGluZ092ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcImludmlzaWJsZVwiKTtcbiAgICBhd2FpdCBzZXRDaXR5KHNlYXJjaEJhci52YWx1ZSk7XG4gICAgc2VhcmNoQmFyLnZhbHVlID0gXCJcIjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhbGVydChlcnJvci5tZXNzYWdlKTtcbiAgICBsb2FkaW5nT3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiaW52aXNpYmxlXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHVwZGF0ZUxvY2F0aW9uKCk7XG4gIHVwZGF0ZVNpZGViYXIoKTtcbiAgdXBkYXRlSG91cmx5QmFyKCk7XG4gIHVwZGF0ZURhaWx5QmFyKCk7XG4gIGxvYWRpbmdPdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJpbnZpc2libGVcIik7XG59XG4iLCJpbXBvcnQgeyBnZXRGb3JtYXR0ZWREYXRlIH0gZnJvbSBcIi4vZGF0ZXNcIjtcblxuY29uc3Qga2V5ID0gXCI3ZTVlOWY5MTI2OWQ0ZTBhYTRlMTQ1MzM4MjQxMTA0XCI7XG5cbmxldCB3ZWF0aGVyRGF0YSA9IHt9O1xuXG5sZXQgc3lzdGVtID0gXCJtZXRyaWNcIjtcblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEoKSB7XG4gIHJldHVybiB3ZWF0aGVyRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlV2VhdGhlckRhdGEoY2l0eSwgZGF5cywgaG91cnMpIHtcbiAgbGV0IGxhc3RDaXR5ID0gd2VhdGhlckRhdGEuY2l0eTtcblxuICB3ZWF0aGVyRGF0YS5jaXR5ID0gY2l0eTtcbiAgd2VhdGhlckRhdGEuZGF5cyA9IGRheXM7XG4gIHdlYXRoZXJEYXRhLmhvdXJzID0gaG91cnM7XG5cbiAgbGV0IGN1cnJlbnREYXRhUHJvbWlzZSA9IGdldEN1cnJlbnREYXRhKGNpdHkpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIHdlYXRoZXJEYXRhLmN1cnJlbnQgPSByZXN1bHQ7XG4gIH0pO1xuICBsZXQgaGlzdG9yeURhdGFQcm9taXNlID0gZ2V0SGlzdG9yeURhdGEoY2l0eSwgZGF5cywgaG91cnMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIHdlYXRoZXJEYXRhLmhpc3RvcnkgPSByZXN1bHQ7XG4gIH0pO1xuICBsZXQgZm9yZWNhc3REYXRhUHJvbWlzZSA9IGdldEZvcmVjYXN0RGF0YShjaXR5LCBkYXlzLCBob3VycykudGhlbihcbiAgICAocmVzdWx0KSA9PiB7XG4gICAgICB3ZWF0aGVyRGF0YS5mb3JlY2FzdCA9IHJlc3VsdDtcbiAgICB9XG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGN1cnJlbnREYXRhUHJvbWlzZSxcbiAgICBoaXN0b3J5RGF0YVByb21pc2UsXG4gICAgZm9yZWNhc3REYXRhUHJvbWlzZSxcbiAgXSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgd2VhdGhlckRhdGEuY2l0eSA9IGxhc3RDaXR5O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoXywgcmVqZWN0KSA9PiByZWplY3QoZXJyb3IpKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnREYXRhKGNpdHkpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT0ke2tleX0mcT0ke2NpdHl9YCxcbiAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgKTtcbiAgY29uc3QgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBpZiAocmVzcG9uc2VEYXRhLmVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGBBUEkgRXJyb3IgJHtyZXNwb25zZURhdGEuZXJyb3IuY29kZX06ICR7cmVzcG9uc2VEYXRhLmVycm9yLm1lc3NhZ2V9YFxuICAgICk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+IHJlamVjdChyZXNwb25zZURhdGEuZXJyb3IpKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2VEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRIaXN0b3J5RGF0YShjaXR5KSB7XG4gIGlmICh3ZWF0aGVyRGF0YS5kYXlzIDwgMSkgcmV0dXJuO1xuXG4gIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIHN0YXJ0RGF0ZS5zZXREYXRlKHN0YXJ0RGF0ZS5nZXREYXRlKCkgLSB3ZWF0aGVyRGF0YS5kYXlzKTtcblxuICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICB5ZXN0ZXJkYXkuc2V0RGF0ZSh5ZXN0ZXJkYXkuZ2V0RGF0ZSgpIC0gMSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvaGlzdG9yeS5qc29uP2tleT0ke2tleX0mcT0ke2NpdHl9JmR0PSR7Z2V0Rm9ybWF0dGVkRGF0ZShcbiAgICAgIHN0YXJ0RGF0ZVxuICAgICl9JmVuZF9kdD0ke2dldEZvcm1hdHRlZERhdGUoeWVzdGVyZGF5KX1gLFxuICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICApO1xuICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIGlmIChyZXNwb25zZURhdGEuZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgYEFQSSBFcnJvciAke3Jlc3BvbnNlRGF0YS5lcnJvci5jb2RlfTogJHtyZXNwb25zZURhdGEuZXJyb3IubWVzc2FnZX1gXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKF8sIHJlamVjdCkgPT4gcmVqZWN0KHJlc3BvbnNlRGF0YS5lcnJvcikpO1xuICB9XG4gIHJldHVybiByZXNwb25zZURhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0RGF0YShjaXR5KSB7XG4gIGlmICh3ZWF0aGVyRGF0YS5kYXlzIDwgMSkgcmV0dXJuO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7a2V5fSZxPSR7Y2l0eX0mZGF5cz0ke1xuICAgICAgd2VhdGhlckRhdGEuZGF5cyArIDFcbiAgICB9YCxcbiAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgKTtcblxuICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIGlmIChyZXNwb25zZURhdGEuZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgYEFQSSBFcnJvciAke3Jlc3BvbnNlRGF0YS5lcnJvci5jb2RlfTogJHtyZXNwb25zZURhdGEuZXJyb3IubWVzc2FnZX1gXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKF8sIHJlamVjdCkgPT4gcmVqZWN0KHJlc3BvbnNlRGF0YS5lcnJvcikpO1xuICB9XG4gIHJldHVybiByZXNwb25zZURhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldENpdHkoY2l0eSkge1xuICBsZXQgbGFzdENpdHkgPSB3ZWF0aGVyRGF0YS5jaXR5O1xuXG4gIGF3YWl0IHVwZGF0ZVdlYXRoZXJEYXRhKGNpdHksIHdlYXRoZXJEYXRhLmRheXMsIHdlYXRoZXJEYXRhLmhvdXJzKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHdlYXRoZXJEYXRhLmNpdHkgPSBjaXR5O1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgdXBkYXRlV2VhdGhlckRhdGEobGFzdENpdHksIHdlYXRoZXJEYXRhLmRheXMsIHdlYXRoZXJEYXRhLmhvdXJzKTtcbiAgICAgIHdlYXRoZXJEYXRhLmNpdHkgPSBsYXN0Q2l0eTtcblxuICAgICAgaWYgKGVycm9yLmNvZGUgPT09IDEwMDYpIHtcbiAgICAgICAgYWxlcnQoXCJJbnZhbGlkIGxvY2F0aW9uLiBQbGVhc2UgdHJ5IGFnYWluIVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0U3lzdGVtKCkge1xuICByZXR1cm4gc3lzdGVtO1xufVxuXG5mdW5jdGlvbiBzZXRTeXN0ZW0obmV3U3lzdGVtKSB7XG4gIHN5c3RlbSA9IG5ld1N5c3RlbTtcbn1cblxuZXhwb3J0IHsgZ2V0V2VhdGhlckRhdGEsIHVwZGF0ZVdlYXRoZXJEYXRhLCBzZXRDaXR5LCBnZXRTeXN0ZW0sIHNldFN5c3RlbSB9O1xuIiwiZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkRGF0ZShkYXRlKSB7XG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7ZGF0ZS5nZXRNb250aCgpICsgMX0tJHtkYXRlLmdldERhdGUoKX1gO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVQYXJ0T2ZEYXkoaG91cikge1xuICBpZiAoaG91ciA+PSAwICYmIGhvdXIgPCAxMikgcmV0dXJuIFwiTW9ybmluZ1wiO1xuICBpZiAoaG91ciA+PSAxMiAmJiBob3VyIDwgMTgpIHJldHVybiBcIkFmdGVybm9vblwiO1xuICBlbHNlIHJldHVybiBcIkV2ZW5pbmdcIjtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlV2Vla0RheShpbmRleCkge1xuICByZXR1cm4gaXNOYU4oaW5kZXgpXG4gICAgPyBudWxsXG4gICAgOiBbXG4gICAgICAgIFwiU3VuZGF5XCIsXG4gICAgICAgIFwiTW9uZGF5XCIsXG4gICAgICAgIFwiVHVlc2RheVwiLFxuICAgICAgICBcIldlZG5lc2RheVwiLFxuICAgICAgICBcIlRodXJzZGF5XCIsXG4gICAgICAgIFwiRnJpZGF5XCIsXG4gICAgICAgIFwiU2F0dXJkYXlcIixcbiAgICAgIF1baW5kZXhdO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVNb250aChpbmRleCwgc2hvcnQgPSBmYWxzZSkge1xuICBpZiAoaXNOYU4oaW5kZXgpKSByZXR1cm4gbnVsbDtcbiAgbGV0IG1vbnRoID0gW1xuICAgIFwiSmFudWFyeVwiLFxuICAgIFwiRmVicnVhcnlcIixcbiAgICBcIk1hcmNoXCIsXG4gICAgXCJBcHJpbFwiLFxuICAgIFwiTWF5XCIsXG4gICAgXCJKdW5lXCIsXG4gICAgXCJKdWx5XCIsXG4gICAgXCJBdWd1c3RcIixcbiAgICBcIlNlcHRlbWJlclwiLFxuICAgIFwiT2N0b2JlclwiLFxuICAgIFwiTm92ZW1iZXJcIixcbiAgICBcIkRlY2VtYmVyXCIsXG4gIF1baW5kZXhdO1xuXG4gIGlmIChzaG9ydCkgcmV0dXJuIG1vbnRoLnN1YnN0cmluZygwLCAzKTtcbiAgZWxzZSByZXR1cm4gbW9udGg7XG59XG5cbmV4cG9ydCB7XG4gIGdldEZvcm1hdHRlZERhdGUsXG4gIGNhbGN1bGF0ZU1vbnRoLFxuICBjYWxjdWxhdGVQYXJ0T2ZEYXksXG4gIGNhbGN1bGF0ZVdlZWtEYXksXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcblxuaW1wb3J0IHsgdXBkYXRlV2VhdGhlckRhdGEgfSBmcm9tIFwiLi91dGlsL2FwaVwiO1xuXG5pbXBvcnQgdXBkYXRlU2lkZWJhciBmcm9tIFwiLi9zaWRlYmFyXCI7XG5pbXBvcnQgdXBkYXRlTG9jYXRpb24gZnJvbSBcIi4vbG9jYXRpb25cIjtcbmltcG9ydCB1cGRhdGVIb3VybHlCYXIgZnJvbSBcIi4vaG91cmx5XCI7XG5pbXBvcnQgdXBkYXRlRGFpbHlCYXIgZnJvbSBcIi4vZGFpbHlcIjtcbmltcG9ydCBzZXR1cFRvcGJhciBmcm9tIFwiLi90b3BiYXJcIjtcblxuc2V0dXBUb3BiYXIoKTtcblxuY29uc3QgbG9hZGluZ092ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvYWRpbmctb3ZlcmxheVwiKTtcbmxvYWRpbmdPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZpc2libGVcIik7XG51cGRhdGVXZWF0aGVyRGF0YShcIkdlbmV2YVwiLCAyLCAzKS50aGVuKCgpID0+IHtcbiAgbG9hZGluZ092ZXJsYXkuY2xhc3NMaXN0LmFkZChcImludmlzaWJsZVwiKTtcblxuICB1cGRhdGVTaWRlYmFyKCk7XG4gIHVwZGF0ZUxvY2F0aW9uKCk7XG4gIHVwZGF0ZUhvdXJseUJhcigpO1xuICB1cGRhdGVEYWlseUJhcigpO1xufSk7Il0sIm5hbWVzIjpbImdldFN5c3RlbSIsImdldFdlYXRoZXJEYXRhIiwiY2FsY3VsYXRlTW9udGgiLCJ1cGRhdGVEYWlseUJhciIsImFkdmFuY2VEYXlzIiwiZGF5cyIsImhpc3RvcnlEYXRhIiwiaGlzdG9yeSIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJmb3JlY2FzdERhdGEiLCJ3ZWF0aGVyQmFyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGFzQ2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwiZmlyc3RDaGlsZCIsImkiLCJkYXRhIiwid2VhdGhlckl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0ZSIsInNwbGl0IiwiaW5uZXJIVE1MIiwiTnVtYmVyIiwiTWF0aCIsImZsb29yIiwiZGF5IiwiYXZndGVtcF9mIiwiYXZndGVtcF9jIiwiY29uZGl0aW9uIiwiaWNvbiIsInRleHQiLCJhcHBlbmRDaGlsZCIsInVwZGF0ZUhvdXJseUJhciIsImFkdmFuY2VIb3VycyIsImhvdXJzIiwidG9kYXlIb3VybHlEYXRhIiwiaG91ciIsImhvdXJTdHJpbmciLCJEYXRlIiwidG9UaW1lU3RyaW5nIiwic3Vic3RyaW5nIiwicmVsYXRpdmVJbmRleCIsImhvdXJEYXRhIiwidGltZSIsInBvcCIsInRlbXBfZiIsInRlbXBfYyIsInVwZGF0ZUxvY2F0aW9uIiwiY2l0eSIsImN1cnJlbnQiLCJsb2NhdGlvbiIsIm5hbWUiLCJyZWdpb24iLCJjb3VudHJ5IiwidGV4dENvbnRlbnQiLCJ1cGRhdGVXZWF0aGVyRGF0YSIsImNhbGN1bGF0ZVBhcnRPZkRheSIsImNhbGN1bGF0ZVdlZWtEYXkiLCJ1cGRhdGVTaWRlYmFyIiwiY3VycmVudFdlYXRoZXJEYXRhIiwidGltZVN0cmluZyIsInRvZGF5IiwiZ2V0RGF5IiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0RnVsbFllYXIiLCJzcmMiLCJ3aW5kX21waCIsIndpbmRfa3BoIiwiaHVtaWRpdHkiLCJjbG91ZCIsInByZXNzdXJlX2luIiwicHJlc3N1cmVfbWIiLCJzZXRDaXR5Iiwic2V0U3lzdGVtIiwic2V0dXBUb3BiYXIiLCJ1bml0U2VsZWN0b3IiLCJ2YWx1ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZWFyY2hCYXIiLCJldmVudCIsInJlcGVhdGVkIiwia2V5Iiwic3VibWl0Q2l0eSIsInNlYXJjaEJ1dHRvbiIsImxvYWRpbmdPdmVybGF5IiwicmVtb3ZlIiwiZXJyb3IiLCJhbGVydCIsIm1lc3NhZ2UiLCJnZXRGb3JtYXR0ZWREYXRlIiwid2VhdGhlckRhdGEiLCJzeXN0ZW0iLCJsYXN0Q2l0eSIsImN1cnJlbnREYXRhUHJvbWlzZSIsImdldEN1cnJlbnREYXRhIiwidGhlbiIsInJlc3VsdCIsImhpc3RvcnlEYXRhUHJvbWlzZSIsImdldEhpc3RvcnlEYXRhIiwiZm9yZWNhc3REYXRhUHJvbWlzZSIsImdldEZvcmVjYXN0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJjYXRjaCIsIl8iLCJyZWplY3QiLCJyZXNwb25zZSIsImZldGNoIiwibW9kZSIsInJlc3BvbnNlRGF0YSIsImpzb24iLCJjb25zb2xlIiwiY29kZSIsInN0YXJ0RGF0ZSIsInNldERhdGUiLCJ5ZXN0ZXJkYXkiLCJuZXdTeXN0ZW0iLCJpbmRleCIsImlzTmFOIiwic2hvcnQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtb250aCJdLCJzb3VyY2VSb290IjoiIn0=