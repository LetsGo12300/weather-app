import "./styles.css";

// DOM controller
const info = document.querySelector('.info');
const cityName = document.querySelector('.city-name');
const mainTemperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const description = document.querySelector('.description');
const minTemperature = document.querySelector('#min-temp');
const maxTemperature = document.querySelector('#max-temp');
const windSpeed = document.querySelector('.wind-speed');

const displayController = (() => {
    const updateInfo = (city, country, mainTemp, minTemp, maxTemp, hum, wSpeed, desc) => {
        cityName.textContent = `${city}, ${country}`;
        mainTemperature.textContent = `${mainTemp}°C`;
        humidity.textContent = `Humidity: ${hum}%`;
        windSpeed.textContent = `Wind speed: ${wSpeed} m/s`;
        description.textContent = desc;
        minTemperature.textContent = `Min. temp: ${minTemp}°C`;
        maxTemperature.textContent = `Max. temp: ${maxTemp}°C`;
    };
    return {
        updateInfo
    }
})();

// API 
function getWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=00d952e95b26f8bd03c973b670e05f6c&units=metric`, {mode: 'cors'})
    .then(response => response.json())
    .then(data => { 
        console.log(data);
        const city = data.name;
        const country = data.sys.country;
        const mainTemp = data.main.temp;
        const minTemp = data.main.temp_min;
        const maxTemp = data.main.temp_max;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;
        displayController.updateInfo(city, country, mainTemp, minTemp, maxTemp, humidity, windSpeed, description);
    })
    .catch(error => console.log(error))
}

// Event listeners
window.addEventListener('DOMContentLoaded', getWeather('Manila'));
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    let formInput = form.elements['city'].value;
    event.preventDefault();
    getWeather(formInput);
});