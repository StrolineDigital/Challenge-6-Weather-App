// Purpose: This file contains the JavaScript code for the weather dashboard application.
// This const variable block contains the variables that are used to select the elements from the HTML file.
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardDiv = document.querySelector(".weather-cards");
const historyDiv = document.querySelector(".history-container");
const cityArray = [];

const API_KEY = "5d3b3662e37a90ff315192f455538fff"; // API key for OpenWeatherMap API

// Get the search history from the local storage
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
// Function to get the search history
const getSearchHistory = (searchHistory) => {
  const btn = document.createElement("button");
  btn.setAttribute("class", "button");
  btn.setAttribute("value", searchHistory);
  btn.textContent = searchHistory;
  historyDiv.append(btn);
};
// Loop through the search history and display it on the page
for (let i = 0; i < searchHistory.length; i++) {
  getSearchHistory(searchHistory[i]);
}
// Function to convert date string to day of the week or "Today"
const getDayOfWeek = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const today = new Date();
    const dayOfWeek = date.getDay();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return days[dayOfWeek];
  };
  // Modified createWeatherCard function
  const createWeatherCard = (cityName, weatherItem, index) => {
    const dayOfWeek = getDayOfWeek(weatherItem.dt_txt);
    if (index === 0) {
      return ` <div class="details">
                   <h2>${cityName} (${dayOfWeek})</h2>
               <h4>Temperature: ${(weatherItem.main.temp).toFixed(
                 3
               )}°F</h4>
               <h4>Wind: ${weatherItem.wind.speed} MPH</h4>
               <h4> Humidity: ${weatherItem.main.humidity} %</h4>
          </div>
          <div class="icon">
          <img src="https://openweathermap.org/img/wn/${
            weatherItem.weather[0].icon
          }@4x.png" alt="weather-icon"/>
              <h4>${weatherItem.weather[0].description}</h4>
          </div>`;
    } else {
      return `<li class="card">
                <h3>(${dayOfWeek})</h3>
               <img src="https://openweathermap.org/img/wn/${
                 weatherItem.weather[0].icon
               }@2x.png" alt="weather-icon"/>
               <h4>Temp: ${(weatherItem.main.temp).toFixed(3)} °F</h4>
               <h4>Wind: ${weatherItem.wind.speed} MPH</h4>
               <h4> Humidity: ${weatherItem.main.humidity} %</h4>
            </li>`;
    }
  };



//Makes a call to the OpenWeatherMap API to get the weather details.
const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
// Fetches the weather data from the API, then converts the response to JSON, and then displays the weather data on the page.
  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      // Narrows down the weather data to the specific days.
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });

      // Clears the previous weather data to allow for new data to be displayed.
      cityInput.value = "";
      currentWeatherDiv.innerHTML = "";
      weatherCardDiv.innerHTML = "";

      // Creates the weather cards for the current weather and the five day forecast.
      fiveDaysForecast.forEach((weatherItem, index) => {
        if (index === 0) {
          currentWeatherDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, weatherItem, index)
          );
        } else {
          weatherCardDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, weatherItem, index)
          );
        }
      });
    })
    // Error handling for the fetch request.
    .catch(() => {
      alert("An error ocurred while fetching the weather forecast!");
    });
};
//This API call converts the city name to coordinates in order to allow for accurate weather data to be displayed.
const getCityCoordinates = (cityName) => {
  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;

  // Fetches the input city coordinates from the API.
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    // Error handling for the fetch request.
    .catch(() => {
      alert("An error ocurred while fetching the coordinates!");
    });
};

// Function to store the search history in the local storage
const storage = (city) => {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!cityArray.includes(city)) {
    cityArray.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(cityArray));
    getSearchHistory(city);
  }
};


// Function to handle the input change
function handleInputChange(event) {
  const inputValue = event.target.value;
  console.log("Input Value:", inputValue);
}
// Event listener for the search button
searchButton.addEventListener("click", () => {
  const cityName = cityInput.value.trim(); // Removes any whitespace from the input.
  if (!cityName) return; // If the user does not enter a city name, the function will return.
  getCityCoordinates(cityName);
  storage(cityName);
});

// Event listener for the search history buttons
historyDiv.addEventListener("click", (e) => {
  e.preventDefault();
  const cityClick = this.event.target.value;
  getCityCoordinates(cityClick);
});