import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
// import { env } from '$env/static/public';
import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API; // API key from .env file
const WEATHER_FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const WEATHER_CURRENT_API_URL = "https://api.openweathermap.org/data/2.5/weather";

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
    // Make an API call to the OpenWeather API to retrieve the current weather data
    try {
        // console.log(apiKey);
        const response = await axios.get(WEATHER_CURRENT_API_URL, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: "metric",
          },
        });

        if (response.status == 200) {
            return response;
        }
        return null; 
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }    
};

/**
 * This class handles openweathermap API
 *
 * @author Kieron Garvey
 * @version 0.1
 */
/**
 * generateForecast() - Returns forecast from the openweathermap API
 *
 * @param latitude latitude to get forecast from openweathermap
 * @param longitude longitude to get forecast from openweathermap
 * @return forcast to return
 */
export async function generateForecast(latitude: number, longitude: number,) {   
  // Make an API call to the OpenWeather API to retrieve the current weather data
  try {
      // console.log(apiKey);
      const response = await axios.get(WEATHER_FORECAST_API_URL, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: apiKey,
          units: "metric",
        },
      });

      if (response.status == 200) {
          return response;
      }
      return null; 
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }    
};