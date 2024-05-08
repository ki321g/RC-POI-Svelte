import type { Session } from '$lib/types/rugby-club-poi-types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { imageNotification, imageNotificationColor } from '$lib/stores';
import { goto } from '$app/navigation';
import cookie from 'cookie';


//export const ssr = false;
export const load: PageServerLoad = async ({ request, parent }) => {
	const { session } = await parent();
	if (session) {
		const UserId = session._id;
		const userClub = await RugbyClubPOIService.getClubByUserId(UserId);
		// console.log(`UserId: ${UserId}`);
		// console.log(userClub);
		const userImages = await RugbyClubPOIService.getImagesByClubId(userClub._id);
		// console.log("Club Images");
		// console.log(userImages);
		
		return {
			clubs: await RugbyClubPOIService.getClubByUserId(UserId),
			games: await RugbyClubPOIService.getGamesByClubId(userClub._id),
			images: await RugbyClubPOIService.getImagesByClubId(userClub._id)
		};
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
		const address = form.get('address') as string;
		const phone = form.get('phone') as string;
		const website = form.get('website') as string;
		const latitude = form.get('latitude') as string;
		const longitude = form.get('longitude') as string;
		const email = form.get('email') as string;
		const category = form.get('category') as string;
		const description = form.get('description') as string;
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

		// console.log(addClub);
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
		const clubid = form.get('clubid') as string;
		const img = form.get('img') as string;
		// const width = form.get('width') as number;
		// const height = form.get('height') as number;
		// const thumbnailURL = form.get('thumbnailURL') as string;

		const image = {
			clubid,
			img,
			// width,
			// height,
			// thumbnailURL
		}
		// console.log(image);

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
		const _id = form.get('imageid') as string;;

		const deleteImage = {
			_id
		};

		// console.log(deleteClub);

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
		const _id = form.get('clubid') as string;
		const club = form.get('club') as string;
		const address = form.get('address') as string;
		const phone = form.get('phone') as string;
		const website = form.get('website') as string;
		const latitude = form.get('latitude') as string;
		const longitude = form.get('longitude') as string;
		const email = form.get('email') as string;
		const category = form.get('category') as string;
		const description = form.get('description') as string;
		const img = form.get('img') as string;
		const userId = form.get('userId') as string;

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

		// console.log(updateClub);

  		if (updateClub) {
			const result = await RugbyClubPOIService.updateClub(updateClub);
			if (result) {
				console.log("Club updated");
				// throw redirect(303, '/dashboard');
			} else {
				console.log("Club updated failed");
				// throw redirect(307, '/dashboard');
			}
		};
	},

	
	deleteclub: async ({ request, cookies }) => {
		console.log('deleteclub server');

		const form = await request.formData();
		console.log(form);
		const _id = form.get('clubid') as string;;

		const deleteClub = {
			_id
		};

		// console.log(deleteClub);

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
		const _id = form.get('gameid') as string;;

		const deleteGame = {
			_id
		};

		// console.log(deleteGame);

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
		const _id = form.get('gameid') as string;
		const home = form.get('home') as string;
		const homescore = form.get('homescore') as number;
		const awayscore = form.get('awayscore') as number;
		const away = form.get('away') as string;
		const gametime = form.get('gametime') as string;
		const gamelocation = form.get('gamelocation') as string;
		const clubid = form.get('clubid') as string;

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
		// console.log("updateGame array");
		// console.log(updateGame);

  		if (updateGame) {
			const result = await RugbyClubPOIService.updateGame(updateGame);
			if (result) {
				console.log("Game updated");
				throw redirect(303, '/dashboard');
			} else {
				console.log("Game updated failed");
				throw redirect(307, '/dashboard');
			}
		};
	},


	addgame: async ({ request, cookies }) => {
		console.log('addgame server');

		const form = await request.formData();
		console.log(form);		
		const home = form.get('home') as string;
		const homescore = form.get('homescore') as number;
		const awayscore = form.get('awayscore') as number;
		const away = form.get('away') as string;
		const gametime = form.get('gametime') as string;
		const gamelocation = form.get('gamelocation') as string;
		const clubid = form.get('clubid') as string;

		const addGame = {
			home,
			homescore,
			awayscore,
			away,
			gametime,
			gamelocation,
			clubid
		};

		// console.log(addClub);
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
