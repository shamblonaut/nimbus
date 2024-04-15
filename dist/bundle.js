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
    const hourData = todayHourlyData[Number(hourString) + i];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnFCO0FBRTBCO0FBRVQ7QUFDRTtBQUNEO0FBQ0Y7QUFDRjtBQUVuQ2pELG1EQUFXLENBQUMsQ0FBQztBQUViLE1BQU1VLGNBQWMsR0FBRzVFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0FBQ2pFMkUsY0FBYyxDQUFDbkUsU0FBUyxDQUFDb0UsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUM1Qy9CLDREQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUN5QyxJQUFJLENBQUMsTUFBTTtFQUMzQ1gsY0FBYyxDQUFDbkUsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0VBRXpDdUMsb0RBQWEsQ0FBQyxDQUFDO0VBQ2ZYLHFEQUFjLENBQUMsQ0FBQztFQUNoQmQsbURBQWUsQ0FBQyxDQUFDO0VBQ2pCakMsa0RBQWMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmltYnVzLy4vc3JjL2RhaWx5LmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy9ob3VybHkuanMiLCJ3ZWJwYWNrOi8vbmltYnVzLy4vc3JjL2xvY2F0aW9uLmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy9zaWRlYmFyLmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy90b3BiYXIuanMiLCJ3ZWJwYWNrOi8vbmltYnVzLy4vc3JjL3V0aWwvYXBpLmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy91dGlsL2RhdGVzLmpzIiwid2VicGFjazovL25pbWJ1cy8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9uaW1idXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmltYnVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uaW1idXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uaW1idXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uaW1idXMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U3lzdGVtLCBnZXRXZWF0aGVyRGF0YSB9IGZyb20gXCIuL3V0aWwvYXBpXCI7XG5pbXBvcnQgeyBjYWxjdWxhdGVNb250aCB9IGZyb20gXCIuL3V0aWwvZGF0ZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlRGFpbHlCYXIoKSB7XG4gIGNvbnN0IGFkdmFuY2VEYXlzID0gZ2V0V2VhdGhlckRhdGEoKS5kYXlzO1xuICBjb25zdCBoaXN0b3J5RGF0YSA9IGdldFdlYXRoZXJEYXRhKCkuaGlzdG9yeS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcbiAgY29uc3QgZm9yZWNhc3REYXRhID0gZ2V0V2VhdGhlckRhdGEoKS5mb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheTtcblxuICBjb25zdCB3ZWF0aGVyQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWJhci5kYWlseVwiKTtcbiAgd2hpbGUgKHdlYXRoZXJCYXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgd2VhdGhlckJhci5yZW1vdmVDaGlsZCh3ZWF0aGVyQmFyLmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZHZhbmNlRGF5cyAqIDIgKyAxOyBpKyspIHtcbiAgICBsZXQgZGF0YSA9IGkgPCBhZHZhbmNlRGF5cyA/IGhpc3RvcnlEYXRhW2ldIDogZm9yZWNhc3REYXRhW2kgLSBhZHZhbmNlRGF5c107XG5cbiAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgd2VhdGhlckl0ZW0uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaXRlbVwiKTtcbiAgICB3ZWF0aGVySXRlbS5jbGFzc0xpc3QuYWRkKFxuICAgICAgaSA9PT0gYWR2YW5jZURheXMgPyBcInBhZ2UtY29tcG9uZW50XCIgOiBcImhvdmVyLWFuaW1hdGVkXCJcbiAgICApO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRhdGEuZGF0ZS5zcGxpdChcIi1cIik7XG4gICAgd2VhdGhlckl0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZVwiPiR7Y2FsY3VsYXRlTW9udGgoTnVtYmVyKGRhdGVbMV0pIC0gMSl9ICR7ZGF0ZVsyXX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRlbXBlcmF0dXJlXCI+JHtcbiAgICAgICAgICBnZXRTeXN0ZW0oKSA9PT0gXCJpbXBlcmlhbFwiXG4gICAgICAgICAgICA/IGAke01hdGguZmxvb3IoZGF0YS5kYXkuYXZndGVtcF9mKX0gwrBGYFxuICAgICAgICAgICAgOiBgJHtNYXRoLmZsb29yKGRhdGEuZGF5LmF2Z3RlbXBfYyl9IMKwQ2BcbiAgICAgICAgfTwvZGl2PlxuICAgICAgICA8aW1nIHNyYz1cIiR7XG4gICAgICAgICAgZGF0YS5kYXkuY29uZGl0aW9uLmljb25cbiAgICAgICAgfVwiIGFsdD1cIldlYXRoZXIgSWNvblwiIGNsYXNzPVwid2VhdGhlci1pY29uXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWF0aGVyLXN0YXR1c1wiPiR7ZGF0YS5kYXkuY29uZGl0aW9uLnRleHR9PC9kaXY+XG4gICAgYDtcbiAgICB3ZWF0aGVyQmFyLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0U3lzdGVtLCBnZXRXZWF0aGVyRGF0YSB9IGZyb20gXCIuL3V0aWwvYXBpXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZUhvdXJseUJhcigpIHtcbiAgY29uc3QgYWR2YW5jZUhvdXJzID0gZ2V0V2VhdGhlckRhdGEoKS5ob3VycztcbiAgY29uc3QgdG9kYXlIb3VybHlEYXRhID1cbiAgICBnZXRXZWF0aGVyRGF0YSgpLmZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXI7XG5cbiAgY29uc3QgaG91clN0cmluZyA9IG5ldyBEYXRlKCkudG9UaW1lU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDIpO1xuXG4gIGNvbnN0IHdlYXRoZXJCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItYmFyLmhvdXJseVwiKTtcbiAgd2hpbGUgKHdlYXRoZXJCYXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgd2VhdGhlckJhci5yZW1vdmVDaGlsZCh3ZWF0aGVyQmFyLmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IC1hZHZhbmNlSG91cnM7IGkgPD0gYWR2YW5jZUhvdXJzOyBpKyspIHtcbiAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgd2VhdGhlckl0ZW0uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaXRlbVwiKTtcbiAgICB3ZWF0aGVySXRlbS5jbGFzc0xpc3QuYWRkKGkgPT09IDAgPyBcInBhZ2UtY29tcG9uZW50XCIgOiBcImhvdmVyLWFuaW1hdGVkXCIpO1xuXG4gICAgY29uc3QgaG91ckRhdGEgPSB0b2RheUhvdXJseURhdGFbTnVtYmVyKGhvdXJTdHJpbmcpICsgaV07XG5cbiAgICB3ZWF0aGVySXRlbS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZVwiPiR7aG91ckRhdGEudGltZS5zcGxpdChcIiBcIikucG9wKCl9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVtcGVyYXR1cmVcIj4ke1xuICAgICAgICAgICAgICBnZXRTeXN0ZW0oKSA9PT0gXCJpbXBlcmlhbFwiXG4gICAgICAgICAgICAgICAgPyBgJHtNYXRoLmZsb29yKGhvdXJEYXRhLnRlbXBfZil9IMKwRmBcbiAgICAgICAgICAgICAgICA6IGAke01hdGguZmxvb3IoaG91ckRhdGEudGVtcF9jKX0gwrBDYFxuICAgICAgICAgICAgfTwvZGl2PlxuICAgICAgICAgICAgPGltZyBzcmM9XCIke1xuICAgICAgICAgICAgICBob3VyRGF0YS5jb25kaXRpb24uaWNvblxuICAgICAgICAgICAgfVwiIGFsdD1cIldlYXRoZXIgSWNvblwiIGNsYXNzPVwid2VhdGhlci1pY29uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VhdGhlci1zdGF0dXNcIj4ke2hvdXJEYXRhLmNvbmRpdGlvbi50ZXh0fTwvZGl2PlxuICAgICAgICBgO1xuICAgIHdlYXRoZXJCYXIuYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRXZWF0aGVyRGF0YSB9IGZyb20gXCIuL3V0aWwvYXBpXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZUxvY2F0aW9uKCkge1xuICBjb25zdCBjaXR5ID0gZ2V0V2VhdGhlckRhdGEoKS5jdXJyZW50LmxvY2F0aW9uLm5hbWU7XG4gIGNvbnN0IHJlZ2lvbiA9IGdldFdlYXRoZXJEYXRhKCkuY3VycmVudC5sb2NhdGlvbi5yZWdpb247XG4gIGNvbnN0IGNvdW50cnkgPSBnZXRXZWF0aGVyRGF0YSgpLmN1cnJlbnQubG9jYXRpb24uY291bnRyeTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5XCIpLnRleHRDb250ZW50ID0gY2l0eTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWdpb25cIikudGV4dENvbnRlbnQgPSBgJHtcbiAgICByZWdpb24gPyByZWdpb24gKyBcIiwgXCIgOiBcIlwiXG4gIH0ke2NvdW50cnl9YDtcbn1cbiIsImltcG9ydCB7IGdldFN5c3RlbSwgZ2V0V2VhdGhlckRhdGEsIHVwZGF0ZVdlYXRoZXJEYXRhIH0gZnJvbSBcIi4vdXRpbC9hcGlcIjtcbmltcG9ydCB7XG4gIGNhbGN1bGF0ZU1vbnRoLFxuICBjYWxjdWxhdGVQYXJ0T2ZEYXksXG4gIGNhbGN1bGF0ZVdlZWtEYXksXG59IGZyb20gXCIuL3V0aWwvZGF0ZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlU2lkZWJhcigpIHtcbiAgY29uc3QgY3VycmVudFdlYXRoZXJEYXRhID0gZ2V0V2VhdGhlckRhdGEoKS5jdXJyZW50LmN1cnJlbnQ7XG4gIGNvbnN0IHRpbWVTdHJpbmcgPSBuZXcgRGF0ZSgpLnRvVGltZVN0cmluZygpLnN1YnN0cmluZygwLCA1KTtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyZWV0aW5nXCIpLnRleHRDb250ZW50ID0gYEdvb2QgJHtjYWxjdWxhdGVQYXJ0T2ZEYXkoXG4gICAgTnVtYmVyKHRpbWVTdHJpbmcuc3Vic3RyaW5nKDAsIDIpKVxuICApfSwgU3RyYW5nZXIhYDtcblxuICBjb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRldGltZSAudGltZVwiKTtcbiAgaWYgKFxuICAgIHRpbWUudGV4dENvbnRlbnQuc3Vic3RyaW5nKDMpID09PSBcIjU5XCIgJiZcbiAgICB0aW1lU3RyaW5nLnN1YnN0cmluZygzKSA9PT0gXCIwMFwiXG4gICkge1xuICAgIHVwZGF0ZVdlYXRoZXJEYXRhKFxuICAgICAgZ2V0V2VhdGhlckRhdGEoKS5jaXR5LFxuICAgICAgZ2V0V2VhdGhlckRhdGEoKS5kYXlzLFxuICAgICAgZ2V0V2VhdGhlckRhdGEoKS5ob3Vyc1xuICAgICk7XG4gIH1cbiAgdGltZS50ZXh0Q29udGVudCA9IHRpbWVTdHJpbmc7XG5cbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGV0aW1lIC5kYXRlXCIpLnRleHRDb250ZW50ID0gYCR7Y2FsY3VsYXRlV2Vla0RheShcbiAgICB0b2RheS5nZXREYXkoKVxuICApfSwgJHtjYWxjdWxhdGVNb250aChcbiAgICB0b2RheS5nZXRNb250aCgpXG4gICl9ICR7dG9kYXkuZ2V0RGF0ZSgpfSwgJHt0b2RheS5nZXRGdWxsWWVhcigpfWA7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXRvZGF5IC50ZW1wZXJhdHVyZVwiKS50ZXh0Q29udGVudCA9XG4gICAgZ2V0U3lzdGVtKCkgPT09IFwiaW1wZXJpYWxcIlxuICAgICAgPyBgJHtNYXRoLmZsb29yKGN1cnJlbnRXZWF0aGVyRGF0YS50ZW1wX2YpfSDCsEZgXG4gICAgICA6IGAke01hdGguZmxvb3IoY3VycmVudFdlYXRoZXJEYXRhLnRlbXBfYyl9IMKwQ2A7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXRvZGF5IC53ZWF0aGVyLXN0YXR1c1wiKS50ZXh0Q29udGVudCA9XG4gICAgY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbi50ZXh0O1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIud2VhdGhlci10b2RheSAud2VhdGhlci1pY29uXCJcbiAgKS5zcmMgPSBgaHR0cHM6JHtjdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uLmljb259YDtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZGF5LXN0YXRzIC53aW5kLWRhdGFcIikudGV4dENvbnRlbnQgPVxuICAgIGdldFN5c3RlbSgpID09PSBcImltcGVyaWFsXCJcbiAgICAgID8gYCR7Y3VycmVudFdlYXRoZXJEYXRhLndpbmRfbXBofSBtcGhgXG4gICAgICA6IGAke2N1cnJlbnRXZWF0aGVyRGF0YS53aW5kX2twaH0ga20vaGA7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIudG9kYXktc3RhdHMgLmh1bWlkaXR5LWRhdGFcIlxuICApLnRleHRDb250ZW50ID0gYCR7Y3VycmVudFdlYXRoZXJEYXRhLmh1bWlkaXR5fSVgO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnRvZGF5LXN0YXRzIC5jbG91ZHMtZGF0YVwiXG4gICkudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50V2VhdGhlckRhdGEuY2xvdWR9JWA7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXktc3RhdHMgLnByZXNzdXJlLWRhdGFcIikudGV4dENvbnRlbnQgPVxuICAgIGdldFN5c3RlbSgpID09PSBcImltcGVyaWFsXCJcbiAgICAgID8gYCR7Y3VycmVudFdlYXRoZXJEYXRhLnByZXNzdXJlX2lufSBpbkhnYFxuICAgICAgOiBgJHtjdXJyZW50V2VhdGhlckRhdGEucHJlc3N1cmVfbWJ9IG1iYDtcbn1cbiIsImltcG9ydCB1cGRhdGVEYWlseUJhciBmcm9tIFwiLi9kYWlseVwiO1xuaW1wb3J0IHVwZGF0ZUhvdXJseUJhciBmcm9tIFwiLi9ob3VybHlcIjtcbmltcG9ydCB1cGRhdGVMb2NhdGlvbiBmcm9tIFwiLi9sb2NhdGlvblwiO1xuaW1wb3J0IHVwZGF0ZVNpZGViYXIgZnJvbSBcIi4vc2lkZWJhclwiO1xuaW1wb3J0IHsgc2V0Q2l0eSwgc2V0U3lzdGVtIH0gZnJvbSBcIi4vdXRpbC9hcGlcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gc2V0dXBUb3BiYXIoKSB7XG4gIGNvbnN0IHVuaXRTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdW5pdC1zZWxlY3RcIik7XG4gIHNldFN5c3RlbSh1bml0U2VsZWN0b3IudmFsdWUpO1xuICB1bml0U2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgc2V0U3lzdGVtKHVuaXRTZWxlY3Rvci52YWx1ZSk7XG5cbiAgICB1cGRhdGVTaWRlYmFyKCk7XG4gICAgdXBkYXRlSG91cmx5QmFyKCk7XG4gICAgdXBkYXRlRGFpbHlCYXIoKTtcbiAgfSk7XG5cbiAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hiYXJcIik7XG4gIHNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoIWV2ZW50LnJlcGVhdGVkICYmIGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSBzdWJtaXRDaXR5KCk7XG4gIH0pO1xuXG4gIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJ0blwiKTtcbiAgc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRDaXR5KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3VibWl0Q2l0eSgpIHtcbiAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hiYXJcIik7XG5cbiAgaWYgKHNlYXJjaEJhci52YWx1ZSA9PT0gXCJcIikgcmV0dXJuO1xuXG4gIGNvbnN0IGxvYWRpbmdPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2FkaW5nLW92ZXJsYXlcIik7XG5cbiAgdHJ5IHtcbiAgICBsb2FkaW5nT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiaW52aXNpYmxlXCIpO1xuICAgIGF3YWl0IHNldENpdHkoc2VhcmNoQmFyLnZhbHVlKTtcbiAgICBzZWFyY2hCYXIudmFsdWUgPSBcIlwiO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xuICAgIGxvYWRpbmdPdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJpbnZpc2libGVcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdXBkYXRlTG9jYXRpb24oKTtcbiAgdXBkYXRlU2lkZWJhcigpO1xuICB1cGRhdGVIb3VybHlCYXIoKTtcbiAgdXBkYXRlRGFpbHlCYXIoKTtcbiAgbG9hZGluZ092ZXJsYXkuY2xhc3NMaXN0LmFkZChcImludmlzaWJsZVwiKTtcbn1cbiIsImltcG9ydCB7IGdldEZvcm1hdHRlZERhdGUgfSBmcm9tIFwiLi9kYXRlc1wiO1xuXG5jb25zdCBrZXkgPSBcIjdlNWU5ZjkxMjY5ZDRlMGFhNGUxNDUzMzgyNDExMDRcIjtcblxubGV0IHdlYXRoZXJEYXRhID0ge307XG5cbmxldCBzeXN0ZW0gPSBcIm1ldHJpY1wiO1xuXG5mdW5jdGlvbiBnZXRXZWF0aGVyRGF0YSgpIHtcbiAgcmV0dXJuIHdlYXRoZXJEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVXZWF0aGVyRGF0YShjaXR5LCBkYXlzLCBob3Vycykge1xuICBsZXQgbGFzdENpdHkgPSB3ZWF0aGVyRGF0YS5jaXR5O1xuXG4gIHdlYXRoZXJEYXRhLmNpdHkgPSBjaXR5O1xuICB3ZWF0aGVyRGF0YS5kYXlzID0gZGF5cztcbiAgd2VhdGhlckRhdGEuaG91cnMgPSBob3VycztcblxuICBsZXQgY3VycmVudERhdGFQcm9taXNlID0gZ2V0Q3VycmVudERhdGEoY2l0eSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgd2VhdGhlckRhdGEuY3VycmVudCA9IHJlc3VsdDtcbiAgfSk7XG4gIGxldCBoaXN0b3J5RGF0YVByb21pc2UgPSBnZXRIaXN0b3J5RGF0YShjaXR5LCBkYXlzLCBob3VycykudGhlbigocmVzdWx0KSA9PiB7XG4gICAgd2VhdGhlckRhdGEuaGlzdG9yeSA9IHJlc3VsdDtcbiAgfSk7XG4gIGxldCBmb3JlY2FzdERhdGFQcm9taXNlID0gZ2V0Rm9yZWNhc3REYXRhKGNpdHksIGRheXMsIGhvdXJzKS50aGVuKFxuICAgIChyZXN1bHQpID0+IHtcbiAgICAgIHdlYXRoZXJEYXRhLmZvcmVjYXN0ID0gcmVzdWx0O1xuICAgIH1cbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgY3VycmVudERhdGFQcm9taXNlLFxuICAgIGhpc3RvcnlEYXRhUHJvbWlzZSxcbiAgICBmb3JlY2FzdERhdGFQcm9taXNlLFxuICBdKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICB3ZWF0aGVyRGF0YS5jaXR5ID0gbGFzdENpdHk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+IHJlamVjdChlcnJvcikpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudERhdGEoY2l0eSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PSR7a2V5fSZxPSR7Y2l0eX1gLFxuICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICApO1xuICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIGlmIChyZXNwb25zZURhdGEuZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgYEFQSSBFcnJvciAke3Jlc3BvbnNlRGF0YS5lcnJvci5jb2RlfTogJHtyZXNwb25zZURhdGEuZXJyb3IubWVzc2FnZX1gXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKF8sIHJlamVjdCkgPT4gcmVqZWN0KHJlc3BvbnNlRGF0YS5lcnJvcikpO1xuICB9XG4gIHJldHVybiByZXNwb25zZURhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEhpc3RvcnlEYXRhKGNpdHkpIHtcbiAgaWYgKHdlYXRoZXJEYXRhLmRheXMgPCAxKSByZXR1cm47XG5cbiAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgc3RhcnREYXRlLnNldERhdGUoc3RhcnREYXRlLmdldERhdGUoKSAtIHdlYXRoZXJEYXRhLmRheXMpO1xuXG4gIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gIHllc3RlcmRheS5zZXREYXRlKHllc3RlcmRheS5nZXREYXRlKCkgLSAxKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9oaXN0b3J5Lmpzb24/a2V5PSR7a2V5fSZxPSR7Y2l0eX0mZHQ9JHtnZXRGb3JtYXR0ZWREYXRlKFxuICAgICAgc3RhcnREYXRlXG4gICAgKX0mZW5kX2R0PSR7Z2V0Rm9ybWF0dGVkRGF0ZSh5ZXN0ZXJkYXkpfWAsXG4gICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICk7XG4gIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgaWYgKHJlc3BvbnNlRGF0YS5lcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgQVBJIEVycm9yICR7cmVzcG9uc2VEYXRhLmVycm9yLmNvZGV9OiAke3Jlc3BvbnNlRGF0YS5lcnJvci5tZXNzYWdlfWBcbiAgICApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoXywgcmVqZWN0KSA9PiByZWplY3QocmVzcG9uc2VEYXRhLmVycm9yKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3REYXRhKGNpdHkpIHtcbiAgaWYgKHdlYXRoZXJEYXRhLmRheXMgPCAxKSByZXR1cm47XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHtrZXl9JnE9JHtjaXR5fSZkYXlzPSR7XG4gICAgICB3ZWF0aGVyRGF0YS5kYXlzICsgMVxuICAgIH1gLFxuICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICApO1xuXG4gIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgaWYgKHJlc3BvbnNlRGF0YS5lcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgQVBJIEVycm9yICR7cmVzcG9uc2VEYXRhLmVycm9yLmNvZGV9OiAke3Jlc3BvbnNlRGF0YS5lcnJvci5tZXNzYWdlfWBcbiAgICApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoXywgcmVqZWN0KSA9PiByZWplY3QocmVzcG9uc2VEYXRhLmVycm9yKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0Q2l0eShjaXR5KSB7XG4gIGxldCBsYXN0Q2l0eSA9IHdlYXRoZXJEYXRhLmNpdHk7XG5cbiAgYXdhaXQgdXBkYXRlV2VhdGhlckRhdGEoY2l0eSwgd2VhdGhlckRhdGEuZGF5cywgd2VhdGhlckRhdGEuaG91cnMpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgd2VhdGhlckRhdGEuY2l0eSA9IGNpdHk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICB1cGRhdGVXZWF0aGVyRGF0YShsYXN0Q2l0eSwgd2VhdGhlckRhdGEuZGF5cywgd2VhdGhlckRhdGEuaG91cnMpO1xuICAgICAgd2VhdGhlckRhdGEuY2l0eSA9IGxhc3RDaXR5O1xuXG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gMTAwNikge1xuICAgICAgICBhbGVydChcIkludmFsaWQgbG9jYXRpb24uIFBsZWFzZSB0cnkgYWdhaW4hXCIpO1xuICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRTeXN0ZW0oKSB7XG4gIHJldHVybiBzeXN0ZW07XG59XG5cbmZ1bmN0aW9uIHNldFN5c3RlbShuZXdTeXN0ZW0pIHtcbiAgc3lzdGVtID0gbmV3U3lzdGVtO1xufVxuXG5leHBvcnQgeyBnZXRXZWF0aGVyRGF0YSwgdXBkYXRlV2VhdGhlckRhdGEsIHNldENpdHksIGdldFN5c3RlbSwgc2V0U3lzdGVtIH07XG4iLCJmdW5jdGlvbiBnZXRGb3JtYXR0ZWREYXRlKGRhdGUpIHtcbiAgcmV0dXJuIGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtkYXRlLmdldE1vbnRoKCkgKyAxfS0ke2RhdGUuZ2V0RGF0ZSgpfWA7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVBhcnRPZkRheShob3VyKSB7XG4gIGlmIChob3VyID49IDAgJiYgaG91ciA8IDEyKSByZXR1cm4gXCJNb3JuaW5nXCI7XG4gIGlmIChob3VyID49IDEyICYmIGhvdXIgPCAxOCkgcmV0dXJuIFwiQWZ0ZXJub29uXCI7XG4gIGVsc2UgcmV0dXJuIFwiRXZlbmluZ1wiO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVXZWVrRGF5KGluZGV4KSB7XG4gIHJldHVybiBpc05hTihpbmRleClcbiAgICA/IG51bGxcbiAgICA6IFtcbiAgICAgICAgXCJTdW5kYXlcIixcbiAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgXCJUdWVzZGF5XCIsXG4gICAgICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgXCJGcmlkYXlcIixcbiAgICAgICAgXCJTYXR1cmRheVwiLFxuICAgICAgXVtpbmRleF07XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZU1vbnRoKGluZGV4LCBzaG9ydCA9IGZhbHNlKSB7XG4gIGlmIChpc05hTihpbmRleCkpIHJldHVybiBudWxsO1xuICBsZXQgbW9udGggPSBbXG4gICAgXCJKYW51YXJ5XCIsXG4gICAgXCJGZWJydWFyeVwiLFxuICAgIFwiTWFyY2hcIixcbiAgICBcIkFwcmlsXCIsXG4gICAgXCJNYXlcIixcbiAgICBcIkp1bmVcIixcbiAgICBcIkp1bHlcIixcbiAgICBcIkF1Z3VzdFwiLFxuICAgIFwiU2VwdGVtYmVyXCIsXG4gICAgXCJPY3RvYmVyXCIsXG4gICAgXCJOb3ZlbWJlclwiLFxuICAgIFwiRGVjZW1iZXJcIixcbiAgXVtpbmRleF07XG5cbiAgaWYgKHNob3J0KSByZXR1cm4gbW9udGguc3Vic3RyaW5nKDAsIDMpO1xuICBlbHNlIHJldHVybiBtb250aDtcbn1cblxuZXhwb3J0IHtcbiAgZ2V0Rm9ybWF0dGVkRGF0ZSxcbiAgY2FsY3VsYXRlTW9udGgsXG4gIGNhbGN1bGF0ZVBhcnRPZkRheSxcbiAgY2FsY3VsYXRlV2Vla0RheSxcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuXG5pbXBvcnQgeyB1cGRhdGVXZWF0aGVyRGF0YSB9IGZyb20gXCIuL3V0aWwvYXBpXCI7XG5cbmltcG9ydCB1cGRhdGVTaWRlYmFyIGZyb20gXCIuL3NpZGViYXJcIjtcbmltcG9ydCB1cGRhdGVMb2NhdGlvbiBmcm9tIFwiLi9sb2NhdGlvblwiO1xuaW1wb3J0IHVwZGF0ZUhvdXJseUJhciBmcm9tIFwiLi9ob3VybHlcIjtcbmltcG9ydCB1cGRhdGVEYWlseUJhciBmcm9tIFwiLi9kYWlseVwiO1xuaW1wb3J0IHNldHVwVG9wYmFyIGZyb20gXCIuL3RvcGJhclwiO1xuXG5zZXR1cFRvcGJhcigpO1xuXG5jb25zdCBsb2FkaW5nT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGluZy1vdmVybGF5XCIpO1xubG9hZGluZ092ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcImludmlzaWJsZVwiKTtcbnVwZGF0ZVdlYXRoZXJEYXRhKFwiR2VuZXZhXCIsIDIsIDMpLnRoZW4oKCkgPT4ge1xuICBsb2FkaW5nT3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiaW52aXNpYmxlXCIpO1xuXG4gIHVwZGF0ZVNpZGViYXIoKTtcbiAgdXBkYXRlTG9jYXRpb24oKTtcbiAgdXBkYXRlSG91cmx5QmFyKCk7XG4gIHVwZGF0ZURhaWx5QmFyKCk7XG59KTsiXSwibmFtZXMiOlsiZ2V0U3lzdGVtIiwiZ2V0V2VhdGhlckRhdGEiLCJjYWxjdWxhdGVNb250aCIsInVwZGF0ZURhaWx5QmFyIiwiYWR2YW5jZURheXMiLCJkYXlzIiwiaGlzdG9yeURhdGEiLCJoaXN0b3J5IiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImZvcmVjYXN0RGF0YSIsIndlYXRoZXJCYXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNDaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJmaXJzdENoaWxkIiwiaSIsImRhdGEiLCJ3ZWF0aGVySXRlbSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRlIiwic3BsaXQiLCJpbm5lckhUTUwiLCJOdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJkYXkiLCJhdmd0ZW1wX2YiLCJhdmd0ZW1wX2MiLCJjb25kaXRpb24iLCJpY29uIiwidGV4dCIsImFwcGVuZENoaWxkIiwidXBkYXRlSG91cmx5QmFyIiwiYWR2YW5jZUhvdXJzIiwiaG91cnMiLCJ0b2RheUhvdXJseURhdGEiLCJob3VyIiwiaG91clN0cmluZyIsIkRhdGUiLCJ0b1RpbWVTdHJpbmciLCJzdWJzdHJpbmciLCJob3VyRGF0YSIsInRpbWUiLCJwb3AiLCJ0ZW1wX2YiLCJ0ZW1wX2MiLCJ1cGRhdGVMb2NhdGlvbiIsImNpdHkiLCJjdXJyZW50IiwibG9jYXRpb24iLCJuYW1lIiwicmVnaW9uIiwiY291bnRyeSIsInRleHRDb250ZW50IiwidXBkYXRlV2VhdGhlckRhdGEiLCJjYWxjdWxhdGVQYXJ0T2ZEYXkiLCJjYWxjdWxhdGVXZWVrRGF5IiwidXBkYXRlU2lkZWJhciIsImN1cnJlbnRXZWF0aGVyRGF0YSIsInRpbWVTdHJpbmciLCJ0b2RheSIsImdldERheSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwic3JjIiwid2luZF9tcGgiLCJ3aW5kX2twaCIsImh1bWlkaXR5IiwiY2xvdWQiLCJwcmVzc3VyZV9pbiIsInByZXNzdXJlX21iIiwic2V0Q2l0eSIsInNldFN5c3RlbSIsInNldHVwVG9wYmFyIiwidW5pdFNlbGVjdG9yIiwidmFsdWUiLCJhZGRFdmVudExpc3RlbmVyIiwic2VhcmNoQmFyIiwiZXZlbnQiLCJyZXBlYXRlZCIsImtleSIsInN1Ym1pdENpdHkiLCJzZWFyY2hCdXR0b24iLCJsb2FkaW5nT3ZlcmxheSIsInJlbW92ZSIsImVycm9yIiwiYWxlcnQiLCJtZXNzYWdlIiwiZ2V0Rm9ybWF0dGVkRGF0ZSIsIndlYXRoZXJEYXRhIiwic3lzdGVtIiwibGFzdENpdHkiLCJjdXJyZW50RGF0YVByb21pc2UiLCJnZXRDdXJyZW50RGF0YSIsInRoZW4iLCJyZXN1bHQiLCJoaXN0b3J5RGF0YVByb21pc2UiLCJnZXRIaXN0b3J5RGF0YSIsImZvcmVjYXN0RGF0YVByb21pc2UiLCJnZXRGb3JlY2FzdERhdGEiLCJQcm9taXNlIiwiYWxsIiwiY2F0Y2giLCJfIiwicmVqZWN0IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJyZXNwb25zZURhdGEiLCJqc29uIiwiY29uc29sZSIsImNvZGUiLCJzdGFydERhdGUiLCJzZXREYXRlIiwieWVzdGVyZGF5IiwibmV3U3lzdGVtIiwiaW5kZXgiLCJpc05hTiIsInNob3J0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibW9udGgiXSwic291cmNlUm9vdCI6IiJ9