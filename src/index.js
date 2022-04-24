import "./styles.css";

// DOM controller
const leftContainer = document.querySelector('.left');
const cityName = document.querySelector('.city-name');
const mainTemperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const description = document.querySelector('.description');
const minTemperature = document.querySelector('#min-temp');
const maxTemperature = document.querySelector('#max-temp');
const windSpeed = document.querySelector('.wind-speed');
const errorDiv = document.querySelector('.error-div');

const displayController = (() => {
    const updateInfo = (city, country, mainTemp, minTemp, maxTemp, hum, wSpeed, desc, unitMeasurement) => {
        clearErrorDiv();
        let tempUnit, speedUnit;
        if (unitMeasurement === 'metric'){
            tempUnit = '°C';
            speedUnit = 'm/s'
        } else {
            tempUnit = '°F';
            speedUnit = 'mph'
        }
        cityName.textContent = `${city}, ${country}`;
        mainTemperature.textContent = `${mainTemp}${tempUnit}`;
        humidity.textContent = `Humidity: ${hum}%`;
        windSpeed.textContent = `Wind speed: ${wSpeed} ${speedUnit}`;
        description.textContent = desc;
        minTemperature.textContent = `Min. temp: ${minTemp}${tempUnit}`;
        maxTemperature.textContent = `Max. temp: ${maxTemp}${tempUnit}`;
    };
    const showError = (error) => {
        errorDiv.textContent = error.message;
    };
    function clearErrorDiv(){
        errorDiv.textContent = '';
    }
    return {
        updateInfo,
        showError
    }
})();

// API 
function getWeather(city, unit){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=00d952e95b26f8bd03c973b670e05f6c&units=${unit}`, {mode: 'cors'})
    .then(response => {
        if (response.ok) {
            return response.json();
          }
        throw new Error('No matching location found!');
    })
    .then(data => {
        const city = data.name;
        const country = data.sys.country;
        const mainTemp = data.main.temp;
        const minTemp = data.main.temp_min;
        const maxTemp = data.main.temp_max;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;
        displayController.updateInfo(city, country, mainTemp, minTemp, maxTemp, humidity, windSpeed, description, unit);
    })
    .catch(error => {
        displayController.showError(error);
    })
}

let unit = 'metric';
let currentCity = 'Manila';
// Event listeners
window.addEventListener('DOMContentLoaded', getWeather(currentCity, unit)); // default city = Manila, PH
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    currentCity = form.elements['city'].value;
    event.preventDefault();
    getWeather(currentCity, unit);
});

leftContainer.addEventListener('click', () => {
    unit = unit === 'metric' ? 'imperial' : 'metric';
    getWeather(currentCity, unit);
});

