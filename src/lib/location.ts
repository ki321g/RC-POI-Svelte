import { writable } from "svelte/store";
import axios from "axios";

export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

const GEOCODING_API_URL = "https://api.openweathermap.org/geo/1.0/reverse";


export const location = (() => {
	const { subscribe, set } = writable<City>({
		name: '',
		lat: null,
		lon: null,
		country: ''
	});

	/**
	 * Get the user's current location and set the corresponding values to `location`
	 */
	const autoset = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude: lat, longitude: lon } = position.coords;

				const response = await axios.get(GEOCODING_API_URL, {
					params: {
						lat,
						lon,
						limit: 1,
						appid: apiKey
					}
				});

				const { name, country } = response.data[0];

				set({ name, lat, lon, country });
			});
		}
	};

	const setLocation = (city: City) => {
		const { name, lat, lon, country } = city;
		set({ name, lat, lon, country });
	};

	return { subscribe, autoset, set: setLocation };
})();
