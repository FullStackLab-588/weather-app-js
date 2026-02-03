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
let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-date-time");
let weathForecast = document.querySelector(".weather-forcast");
let weathTempr = document.querySelector(".weather-tempera");
let weathIcon = document.querySelector(".weather-icon");
let weathMin = document.querySelector(".weather-min");
let weathMax = document.querySelector(".weather-max");

let weathFeelsLike = document.querySelector(".weather-feels-like");
let weathHumidity = document.querySelector(".weather-humidity");
let weathWind = document.querySelector(".weather-wind");
let weathPressure = document.querySelector(".weather-pressure");

let citySearch = document.querySelector(".weather-search");

// Default city
let city = "Havelian";

// Country Name
const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// Date & Time
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

// Search City
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.querySelector(".city-name");
  city = input.value.trim();
  if (city !== "") {
    getWeatherData();
  }
});

// Fetch Weather Data
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
    weathIcon.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" 
           alt="${weather[0].description}">
    `;

    weathTempr.innerHTML = `${main.temp.toFixed(1)}&#176;C`;
    weathMin.innerHTML = `Min: ${main.temp_min.toFixed(1)}&#176;C`;
    weathMax.innerHTML = `Max: ${main.temp_max.toFixed(1)}&#176;C`;

    weathFeelsLike.innerHTML = `${main.feels_like.toFixed(1)}&#176;C`;
    weathHumidity.innerHTML = `${main.humidity}%`;
    weathWind.innerHTML = `${wind.speed} m/s`;
    weathPressure.innerHTML = `${main.pressure} hPa`;

  } catch (error) {
    console.error("Error:", error);
  }
};

// Load Default City Weather
window.addEventListener("load", getWeatherData);
