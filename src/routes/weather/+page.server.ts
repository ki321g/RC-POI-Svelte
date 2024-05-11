import type { Session } from '$lib/types/rugby-club-poi-types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { imageNotification, imageNotificationColor } from '$lib/stores';
import { goto } from '$app/navigation';
import cookie from 'cookie';
import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
// import fs from 'fs';



export const ssr = false;
export const load: PageServerLoad = async ({ request, parent }) => {
	const { session } = await parent();
	if (session) {
		let currentTemp: CurrentTemp = {
			temp: null,
			feels_like: null,
			humidity: null,
			description: null,
			iconCode: null,
		  };
		  
		const UserId = session._id;
		const userClub = await RugbyClubPOIService.getClubByUserId(UserId);
		if (userClub) {
		const userImages = await RugbyClubPOIService.getImagesByClubId(userClub._id);

		let currentWeather = await generateReading(userClub.latitude, userClub.longitude);
	
		currentTemp.temp = currentWeather.data.main.temp;
		currentTemp.feels_like = currentWeather.data.main.feels_like;
		currentTemp.humidity = currentWeather.data.main.humidity;
		currentTemp.description = currentWeather.data.weather[0].description;
		currentTemp.iconCode = currentWeather.data.weather[0].id;
		
		console.log(currentTemp);
		// currentWeather = {
		// 	date: currentWeather.headers.date,
		// 	data: currentWeather.data			
		//   };

		// console.log("#### Weather ####");
		// console.log(JSON.stringify(currentWeather, null, 2));
		// console.log("^^^^ Weather ^^^^");

		let currentForecast = await generateForecast(userClub.latitude, userClub.longitude);
		
		// currentForecast = {
		// 	date: currentForecast.headers.date,
		// 	data: currentForecast.data.list			
		//   };
		const tempList = currentForecast.data.list;
		// console.log("#### Forecast ####");		
		// console.log(currentForecast);
		// console.log(JSON.stringify(currentForecast, null, 2));
		// console.log("^^^^ Forecast ^^^^");

		// fs.writeFile('currentForecast.json', JSON.stringify(currentForecast, null, 2), (err) => {
		// 	if (err) throw err;
		// 	console.log('The file has been saved!');
		//   });
        // let jsonString = JSON.stringify(currentForecast);
		return {
			currentForecast: tempList,
			currentWeather: currentTemp,
		};
	}
	  }	
};

