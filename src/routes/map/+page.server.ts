import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";
import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
// import fs from 'fs';

export const ssr = false;

export const load: PageServerLoad = async () => {
    let allClubs = await RugbyClubPOIService.getClubs();

    for (let club of allClubs) {
      let currentTemp: CurrentTemp = {
        temp: null,
        feels_like: null,
        humidity: null,
        description: null,
        iconCode: null,
      };
  
      let tempWeather = await generateReading(club.latitude, club.longitude);
      let tempForecast = await generateForecast(club.latitude, club.longitude);
  
      club.currentForecast = tempForecast.data.list;
  
      currentTemp.temp = tempWeather.data.main.temp;
      currentTemp.feels_like = tempWeather.data.main.feels_like;
      currentTemp.humidity = tempWeather.data.main.humidity;
      currentTemp.description = tempWeather.data.weather[0].description;
      currentTemp.iconCode = tempWeather.data.weather[0].id;
  
      club.currentWeather = currentTemp;
    }

    // fs.writeFile('currentForecast.json', JSON.stringify(allClubs[0], null, 2), (err) => {
    //   	if (err) throw err;
    //   	console.log('The file has been saved!');
    //     });
  return {
    clubs: allClubs,
  };
};