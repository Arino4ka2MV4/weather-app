import {cityNames, params} from "./consts.mjs";

const select = document.querySelector('.city-select');
const temp = document.querySelector('.temp');
const feels_like = document.querySelector('.feels_like');
const weather_img = document.querySelector('.weather-img');
const weather_description = document.querySelector('.weather-description');

(function() {
    for (let i = 0; i < cityNames.length; i++) {
        let newOption = new Option(cityNames[i].ru, cityNames[i].eng);
        select.append(newOption);
    }
}());

async function getCoords() {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${select.value}&appid=${params.apiKey}`);
    const data = await response.json();
    return data[0];
}

async function getWeather() {
    weather_img.style.display = 'flex';
    const coords = await getCoords();
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${params.apiKey}`)
    const data = await res.json();
    console.log(data);
    temp.textContent = `${(data.main.temp - 273).toFixed(2)} C°`;
    feels_like.innerHTML = `Ощущается как ${(data.main.feels_like - 273).toFixed(2)} C°`;
    switch (data.weather[0].main) {
        case 'Clouds':
            weather_img.src = '/assets/cloud.svg';
            weather_description.textContent = 'Облачно';
            break;
        case 'Clear':
            weather_img.src = '/assets/clear.svg';
            weather_description.textContent = 'Ясно';
            break;
        case 'Rain':
            weather_img.src = '/assets/rain.svg';
            weather_description.textContent = 'Дождь';
            break;
        case 'Haze':
            weather_img.src = '/assets/haze.svg';
            weather_description.textContent = 'Туман';
            break;
        default:
            weather_description.textContent = 'Неизвестно';
            break;
    }
}

select.addEventListener('change', getWeather);