// let cityName = document.querySelector(".weather-city");
// let dateTime = document.querySelector(".weather-date-time");
// let weathForecast = document.querySelector(".weather-forcast");
// let weathTempr = document.querySelector(".weather-tempera");
// let weathIcon = document.querySelector(".weather-icon");
// let weathMin = document.querySelector(".weather-min");
// let weathMax = document.querySelector(".weather-max");


// // card refference 
// let weathFeelsLike = document.querySelector(".weather-feels-like");
// let weathHumidity = document.querySelector(".weather-humidity");
// let weathWind = document.querySelector(".weather-wind");
// let weathPressure = document.querySelector(".weather-pressure");

// let citySearch = document.querySelector(".weather-search");



// // actual country name
// const getCountryName = (code) => {
// return new Intl.DisplayNames([code], {type: 'region'}).of(code);
// }
// // date time


// const getDateTime = (dt) => {
    
//     const curDate = new Date(dt*1000);
//     console.log(curDate);


// const options = {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
//   hour: "numeric",
//   minute: "numeric",

// };


// const formattedDate = new Intl.DateTimeFormat("en-US", options);
// return formattedDate.format(curDate);



// }


// let city = "havelian"

// // for search
// citySearch.addEventListener('submit' , (e) => {
// e.preventDefault();
// let cityName = document.querySelector(".city-name");
// console.log(cityName.value);
// city = cityName.value;
// getWeatherData();
// cityName.value = "";
// });


// const getWeatherData = async () => {

//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0b06669a793506ae54060f7df8a5fb6`;


    
// try{
// const res = await fetch(weatherUrl);
// const data = await res.json();
// console.log(data);

// const {main, name, weather,wind,sys, dt} = data;
// cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
// dateTime.innerHTML = getDateTime(dt);
// weathForecast. innerHTML = weather[0].main;
// weathIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">`;



// weathTempr.innerHTML = `${main.temp}&#176;`;
// weathMin.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
// weathMax.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
// weathFeelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
// weathHumidity.innerHTML = `${main.humidity}%`;
// weathWind.innerHTML = `${wind.speed} m/s`;
// weathPressure.innerHTML = `${main.pressure} hpa`;
// }
// catch (error){
//     console.log(error);

// }
// }

// document.body.addEventListener("load" , getWeatherData());



// DOM Elements
const cityName = document.querySelector(".weather-city");
const dateTime = document.querySelector(".weather-date-time");
const weathForecast = document.querySelector(".weather-forcast");
const weathTempr = document.querySelector(".weather-tempera");
const weathIcon = document.querySelector(".weather-icon");
const weathMin = document.querySelector(".weather-min");
const weathMax = document.querySelector(".weather-max");
const weathFeelsLike = document.querySelector(".weather-feels-like");
const weathHumidity = document.querySelector(".weather-humidity");
const weathWind = document.querySelector(".weather-wind");
const weathPressure = document.querySelector(".weather-pressure");
const citySearch = document.querySelector(".weather-search");

// Default city
let city = "Havelian";

// Country Name function
const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// Format Unix timestamp to readable date
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

// Search city functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector(".city-name"); // input field
  city = input.value.trim();

  if (city !== "") {
    getWeatherData();
    input.value = ""; // clear input after search
  }
});

// Fetch weather data from OpenWeatherMap
const getWeatherData = async () => {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a0b06669a793506ae54060f7df8a5fb6`;

    const res = await fetch(weatherUrl);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    weathForecast.innerHTML = weather[0].main;
    weathIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">`;

    weathTempr.innerHTML = `${main.temp.toFixed(1)}°C`;
    weathMin.innerHTML = `Min: ${main.temp_min.toFixed(1)}°C`;
    weathMax.innerHTML = `Max: ${main.temp_max.toFixed(1)}°C`;

    weathFeelsLike.innerHTML = `${main.feels_like.toFixed(1)}°C`;
    weathHumidity.innerHTML = `${main.humidity}%`;
    weathWind.innerHTML = `${wind.speed} m/s`;
    weathPressure.innerHTML = `${main.pressure} hPa`;

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Load default city weather on page load
window.addEventListener("load", getWeatherData);

