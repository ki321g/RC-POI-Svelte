import type { Session } from '$lib/types/rugby-club-poi-types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { imageNotification, imageNotificationColor } from '$lib/stores';
import { goto } from '$app/navigation';
import cookie from 'cookie';
import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
import { sanitizeInput } from '$lib/utilities/sanitizeInput';

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
		let tempForecast = await generateForecast(userClub.latitude, userClub.longitude);
		const currentForecast = tempForecast.data.list;
	
		currentTemp.temp = currentWeather.data.main.temp;
		currentTemp.feels_like = currentWeather.data.main.feels_like;
		currentTemp.humidity = currentWeather.data.main.humidity;
		currentTemp.description = currentWeather.data.weather[0].description;
		currentTemp.iconCode = currentWeather.data.weather[0].id;

		return {
			clubs: await RugbyClubPOIService.getClubByUserId(UserId),
			games: await RugbyClubPOIService.getGamesByClubId(userClub._id),
			images: await RugbyClubPOIService.getImagesByClubId(userClub._id),
		};
	}
	  }	
};

export const actions = {
	addclub: async ({ request, cookies }) => {
		console.log('addclub server');
		const cookieStr = cookies.get('RugbyClubPOI') as string;
		const session = JSON.parse(cookieStr) as Session;
		const userId = session._id;

		const form = await request.formData();
		console.log(form);
		const club = form.get('club') as string;
		// const address = form.get('address') as string;
		// const phone = form.get('phone') as string;
		// const website = form.get('website') as string;
		// const latitude = form.get('latitude') as string;
		// const longitude = form.get('longitude') as string;
		// const email = form.get('email') as string;
		// const category = form.get('category') as string;
		// const description = form.get('description') as string;
		const address = sanitizeInput(form.get('address') as string);
		const phone = sanitizeInput(form.get('phone') as string);
		const website = sanitizeInput(form.get('website') as string);
		const latitude = sanitizeInput(form.get('latitude') as string);
		const longitude = sanitizeInput(form.get('longitude') as string);
		const email = sanitizeInput(form.get('email') as string);
		const category = sanitizeInput(form.get('category') as string);
		const description = sanitizeInput(form.get('description') as string);
		const img = '';

		const addClub = {
			club,
			address,
			phone,
			website,
			latitude,
			longitude,
			email,
			category,
			description,
			userId
		};

		if (club === '' || address === '' || phone === '' || website === '' || latitude === '' || longitude === '' || email === '' || category === '' || description === '') {
			throw redirect(307, '/');
		} else {
			console.log(`attemting to create club: ${club}, category: ${category} & email: ${email}`);
			const newClub = await RugbyClubPOIService.addClub(addClub);

			if (newClub) {
				// update the store values
				throw redirect(303, '/dashboard');
			} else {
				throw redirect(307, '/');
			}
		}
	},

	addimage: async ({ request, cookies }) => {
		console.log('addimage server');

		const form = await request.formData();
		console.log(form);
		// const clubid = form.get('clubid') as string;
		// const img = form.get('img') as string;		
		const clubid = sanitizeInput(form.get('clubid') as string);
		const img = sanitizeInput(form.get('img') as string);

		const image = {
			clubid,
			img,
		}

  		if (image) {
			const result = await RugbyClubPOIService.addImage(image);
			if (result) {
				console.log("Image uploaded");
				imageNotification.set('Image Uploaded Successfully!');
				imageNotificationColor.set('is-primary');
				throw redirect(303, '/dashboard');
			} else {
				console.log("Image upload failed");				
				imageNotification.set('Image Upload Error!');
				imageNotificationColor.set('is-danger');
				throw redirect(307, '/dashboard');
			}
		}
	},

	deleteimage: async ({ request, cookies }) => {
		console.log('deleteimage server');

		const form = await request.formData();
		console.log(form);
		const _id = sanitizeInput(form.get('imageid') as string);

		const deleteImage = {
			_id
		};

  		if (deleteImage) {
			const result = await RugbyClubPOIService.deleteImage(deleteImage);
			if (result) {
				console.log("Club Deleted");
				throw redirect(303, '/dashboard');
			} else {
				console.log("Club delete failed");
				throw redirect(307, '/dashboard');
			}
		};
	},

	updateclub: async ({ request, cookies }) => {
		console.log('updateclub server');

		const form = await request.formData();
		console.log(form);
		// const _id = form.get('clubid') as string;
		// const club = form.get('club') as string;
		// const address = form.get('address') as string;
		// const phone = form.get('phone') as string;
		// const website = form.get('website') as string;
		// const latitude = form.get('latitude') as string;
		// const longitude = form.get('longitude') as string;
		// const email = form.get('email') as string;
		// const category = form.get('category') as string;
		// const description = form.get('description') as string;
		// const img = form.get('img') as string;
		// const userId = form.get('userId') as string;
		
		const _id = sanitizeInput(form.get('clubid') as string);
		const club = sanitizeInput(form.get('club') as string);
		const address = sanitizeInput(form.get('address') as string);
		const phone = sanitizeInput(form.get('phone') as string);
		const website = sanitizeInput(form.get('website') as string);
		const latitude = sanitizeInput(form.get('latitude') as string);
		const longitude = sanitizeInput(form.get('longitude') as string);
		const email = sanitizeInput(form.get('email') as string);
		const category = sanitizeInput(form.get('category') as string);
		const description = sanitizeInput(form.get('description') as string);
		const img = sanitizeInput(form.get('img') as string);
		const userId = sanitizeInput(form.get('userId') as string);

		const updateClub = {
			_id,
			club,
			address,
			phone,
			website,
			latitude,
			longitude,
			email,
			category,
			description,
			img,
			userId
		}

  		if (updateClub) {
			const result = await RugbyClubPOIService.updateClub(updateClub);
			if (result) {
				console.log("Club updated");
			} else {
				console.log("Club updated failed");;
			}
		};
	},

	
	deleteclub: async ({ request, cookies }) => {
		console.log('deleteclub server');

		const form = await request.formData();
		console.log(form);
		const _id = sanitizeInput(form.get('clubid') as string);

		const deleteClub = {
			_id
		};

  		if (deleteClub) {
			const result = await RugbyClubPOIService.deleteClub(deleteClub);
			if (result) {
				console.log("Club Deleted");
				throw redirect(303, '/dashboard');
			} else {
				console.log("Club delete failed");
				throw redirect(307, '/dashboard');
			}
		};
	}, 

	deletegame: async ({ request, cookies }) => {
		console.log('deletegame server');

		const form = await request.formData();
		console.log(form);
		const _id = sanitizeInput(form.get('gameid') as string);

		const deleteGame = {
			_id
		};

  		if (deleteGame) {
			const result = await RugbyClubPOIService.deleteGame(deleteGame);
			if (result) {
				console.log("Game Deleted");
				throw redirect(303, '/dashboard');
			} else {
				console.log("Game delete failed");
				throw redirect(307, '/dashboard');
			}
		};
	}, 

	updategame: async ({ request, cookies }) => {
		console.log('updategame server');

		const form = await request.formData();
		console.log(form);
		// const _id = form.get('gameid') as string;
		// const home = form.get('home') as string;
		// const homescore = form.get('homescore') as number;
		// const awayscore = form.get('awayscore') as number;
		// const away = form.get('away') as string;
		// const gametime = form.get('gametime') as string;
		// const gamelocation = form.get('gamelocation') as string;
		// const clubid = form.get('clubid') as string;
		
		const _id = sanitizeInput(form.get('gameid') as string);
		const home = sanitizeInput(form.get('home') as string);
		const homescore = sanitizeInput(form.get('homescore') as string);
		const awayscore = sanitizeInput(form.get('awayscore') as string);
		const away = sanitizeInput(form.get('away') as string);
		const gametime = sanitizeInput(form.get('gametime') as string);
		const gamelocation = sanitizeInput(form.get('gamelocation') as string);
		const clubid = sanitizeInput(form.get('clubid') as string);

		const updateGame = {
			_id,
			home,
			homescore,
			awayscore,
			away,
			gametime,
			gamelocation,
			clubid
		}

  		if (updateGame) {
			const result = await RugbyClubPOIService.updateGame(updateGame);
			if (result) {
				console.log("Game updated");
			} else {
				console.log("Game updated failed");
			}
		};
	},

	addgame: async ({ request, cookies }) => {
		console.log('addgame server');

		const form = await request.formData();	
		// const home = form.get('home') as string;
		// const homescore = form.get('homescore') as number;
		// const awayscore = form.get('awayscore') as number;
		// const away = form.get('away') as string;
		// const gametime = form.get('gametime') as string;
		// const gamelocation = form.get('gamelocation') as string;
		// const clubid = form.get('clubid') as string;
		const home = sanitizeInput(form.get('home') as string);
		const homescore = sanitizeInput(form.get('homescore') as string);
		const awayscore = sanitizeInput(form.get('awayscore') as string);
		const away = sanitizeInput(form.get('away') as string);
		const gametime = sanitizeInput(form.get('gametime') as string);
		const gamelocation = sanitizeInput(form.get('gamelocation') as string);
		const clubid = sanitizeInput(form.get('clubid') as string);
		
		const addGame = {
			home,
			homescore,
			awayscore,
			away,
			gametime,
			gamelocation,
			clubid
		};

		if (home === '' || homescore === '' || awayscore === '' || away === '' || gametime === '' || gamelocation === '' || clubid === '') {
			throw redirect(307, '/');
		} else {
			console.log(`attempting to create game: ${home} Vrs, category: ${away}`);
			const newGame = await RugbyClubPOIService.addGame(addGame);

			if (newGame) {
				throw redirect(303, '/dashboard');
			} else {
				throw redirect(307, '/');
			}
		}
	},
};
