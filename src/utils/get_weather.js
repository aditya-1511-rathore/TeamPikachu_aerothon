// import axios from 'axios'

// import get_coordinates from './get_coordinates.js'

// async function getWeatherDetailsForCoordinates(coordinates) {
//     const apiKey = 'bc3b2504d252989228b1d03414fb01d3'; 
//     const weatherDetails = [];
//     for (const coordinate of coordinates) {
//         const { lat, lon } = coordinate;
//         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//         try {
//             const response = await axios.get(url);
//             const body = response.data;
//             //console.log(body)
//             var rain_volume = 0
//             if (body.rain) {
//                 rain_volume = body.rain['1h']
//             }
//             const weatherInfo = {
//                 latitude: body.coord.lat,
//                 longitude: body.coord.lon,
//                 temperature: body.main.temp,
//                 visibility: body.visibility,
//                 wind_speed: body.wind.speed,
//                 rain_volume: rain_volume
//             };

//             weatherDetails.push(weatherInfo);
//         } catch (error) {
//             console.error(`Failed to fetch weather data for coordinates (${lat}, ${lon}):`, error.message);
//         }
//     }

//     return weatherDetails;
// }

// const get_weather = async function (departureCity, arrivalCity) {
//     const coordinates = await get_coordinates(departureCity, arrivalCity)
//     //console.log(coordinates)
//     const weather_details = await getWeatherDetailsForCoordinates(coordinates)
//     //console.log(weather_details)
//     return {weather_details, coordinates}
// }

// export default get_weather

import axios from 'axios';
import get_coordinates from './get_coordinates.js';

async function getWeatherDetailsForCoordinates(coordinates) {
    const apiKey = 'bc3b2504d252989228b1d03414fb01d3';
    const weatherDetails = [];
    for (const coordinate of coordinates) {
        const { lat, lon } = coordinate;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            const body = response.data;
            var rain_volume = 0;
            if (body.rain) {
                rain_volume = body.rain['1h'];
            }
            const weatherInfo = {
                latitude: body.coord.lat,
                longitude: body.coord.lon,
                temperature: body.main.temp,
                visibility: body.visibility,
                wind_speed: body.wind.speed,
                rain_volume: rain_volume
            };

            weatherDetails.push(weatherInfo);
        } catch (error) {
            console.error(`Failed to fetch weather data for coordinates (${lat}, ${lon}):`, error.message);
        }
    }

    return weatherDetails;
}

const get_weather = async function (departureCity, arrivalCity) {
    const coordinatesData = await get_coordinates(departureCity, arrivalCity);
    const weather_details = await getWeatherDetailsForCoordinates(coordinatesData.points);
    return {
        weather_details,
        coordinates: {
            points: coordinatesData.points,
            departure: coordinatesData.departure,
            arrival: coordinatesData.arrival
        }
    };
}

export default get_weather;
