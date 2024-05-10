import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
// import { env } from '$env/static/public';
import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API; // API key from .env file

/**
 * This class handles openweathermap API
 *
 * @author Kieron Garvey
 * @version 0.1
 */
/**
 * generateReading() - Returns a reading from the openweathermap API
 *
 * @param latitude latitude to get reading from openweathermap
 * @param longitude longitude to get reading from openweathermap
 * @return reading to return
 */
export async function generateReading(latitude: number, longitude: number,) {
    // const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${PUBIC_OPEN_WEATHER_API}`;
    // const response = await axios.get(requestUrl);


    // Make an API call to the OpenWeather API to retrieve the current weather data
    // Make an API call to the OpenWeather API to retrieve the current weather data
    try {
        console.log(apiKey);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: "metric",
          },
        });
        console.log(response.data);
        // Return the weather data
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    // const date = new Date(); // Add Current Date
    // let dateTime = date.toLocaleString("en-GB", {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    //     hour12: false,
    // }); // Convert to Format

    // if (response.status == 200) {
    //     const currentWeather = response.data.current;
    //     const newReading = {
    //     timeStamp: String(dateTime),
    //     //code: Number(codeConverter(currentWeather.weather[0].id)),
    //     code: Number(currentWeather.weather[0].id),
    //     temperature: Number(currentWeather.temp),
    //     windSpeed: Number(currentWeather.wind_speed),
    //     windDirection: Number(currentWeather.wind_deg),
    //     pressure: Number(currentWeather.pressure),
    //     };
    //     return newReading;
    // }

    // return null;
}

    
