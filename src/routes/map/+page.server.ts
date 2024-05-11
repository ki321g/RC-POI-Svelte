import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";
import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
// import fs from 'fs';

export const ssr = false;

export const load: PageServerLoad = async () => {
   
  






  

    // console.log(JSON.stringify(allClubs[0], null, 2));
    // fs.writeFile('currentForecast.json', JSON.stringify(allClubs[0], null, 2), (err) => {
    //   	if (err) throw err;
    //   	console.log('The file has been saved!');
    //     });

    // let currentTemp: CurrentTemp = {
    //   temp: null,
    //   feels_like: null,
    //   humidity: null,
    //   description: null,
    //   iconCode: null,
    // };
                                
    // let currentWeather = await generateReading(userClub.latitude, userClub.longitude);
		// let tempForecast = await generateForecast(userClub.latitude, userClub.longitude);

		// const currentForecast = tempForecast.data.list;
	
		// currentTemp.temp = currentWeather.data.main.temp;
		// currentTemp.feels_like = currentWeather.data.main.feels_like;
		// currentTemp.humidity = currentWeather.data.main.humidity;
		// currentTemp.description = currentWeather.data.weather[0].description;
		// currentTemp.iconCode = currentWeather.data.weather[0].id; 

  return {
    clubs: await RugbyClubPOIService.getClubs(),
  };
};