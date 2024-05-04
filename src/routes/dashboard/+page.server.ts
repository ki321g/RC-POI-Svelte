import type { Session } from '$lib/types/rugby-club-poi-types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import cookie from 'cookie';


// export const ssr = false;
export const load: PageServerLoad = async ({ request, parent }) => {
	const { session } = await parent();
	if (session) {
		const UserId = session._id;
		const testing = await RugbyClubPOIService.getClubByUserId(UserId);
		console.log(`UserId: ${UserId}`);
		console.log(testing);
		return {
			clubs: await RugbyClubPOIService.getClubByUserId(UserId),
			games: await RugbyClubPOIService.getGames()
		};
	  }	
};

export const actions = {
	addclub: async ({ request, cookies }) => {
		const cookieStr = cookies.get('RugbyClubPOI') as string;
		const session = JSON.parse(cookieStr) as Session;
		const userId = session._id;

		const form = await request.formData();
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

		console.log(addClub);
		if (club === '' || address === '' || phone === '' || website === '' || latitude === '' || longitude === '' || email === '' || category === '' || description === '') {
			throw redirect(307, '/');
		} else {
			console.log(`attemting to create club: ${club}, category: ${category} & email: ${email}`);
			const newClub = await RugbyClubPOIService.addClub(addClub);

			if (newClub) {
				throw redirect(303, '/dashboard');
			} else {
				throw redirect(307, '/');
			}
		}
	},

	addimage: async ({ request, cookies }) => {
		// const image = request.body;
		// console.log(request);
		// console.log(image);

		const form = await request.formData();
		console.log(form);
		const clubid = form.get('clubid') as string;
		const img = form.get('img') as string;

		const image = {
			clubid,
			img
		}
		console.log(image);

  		if (image) {
			const result = await RugbyClubPOIService.addImage(image);
			if (result) {
				console.log("Image uploaded");
				throw redirect(303, '/dashboard');
			} else {
				console.log("Image upload failed");
				throw redirect(307, '/dashboard');
			}
		}
	},

	updateclub: async ({ request, cookies }) => {
		// const image = request.body;
		// console.log(request);
		// console.log(image);
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

		console.log(updateClub);

  		if (updateClub) {
			const result = await RugbyClubPOIService.updateClub(updateClub);
			if (result) {
				console.log("Club uploaded");
				throw redirect(303, '/dashboard');
			} else {
				console.log("Club upload failed");
				throw redirect(307, '/dashboard');
			}
		};
	}
};

// export async function post(request) {
// 	const { slug } = request.params;
// 	const image = request.body;
  
// 	if (slug === 'addImage') {
// 	  const result = await RugbyClubPOIService.addImage(image);
// 	  if (result) {
// 		return { status: 200, body: { message: 'Image uploaded successfully' } };
// 	  } else {
// 		return { status: 500, body: { message: 'Image upload failed' } };
// 	  }
// 	}
// 	// Handle other routes...
//   }
