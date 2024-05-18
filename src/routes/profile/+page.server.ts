import type { Session } from '$lib/types/rugby-club-poi-types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { goto } from '$app/navigation';
import cookie from 'cookie';

export const load: PageServerLoad = async ({ request, parent }) => {
	const { session } = await parent();
	if (session) {
		const email = session.email;
		console.log(`email: ${email}`);
		const user = await RugbyClubPOIService.getLoggedInUser(email);
		user._id = user._id.toString();
		console.log(user);
		return {
			user: user   
		  };
	  }	
};

export const actions = {
	update: async ({ request, cookies }) => {
		const form = await request.formData();
		const firstName = form.get('firstName') as string;
		const lastName = form.get('lastName') as string;
		const email = form.get('email') as string;
		const password = form.get('password') as string;
		const accountType = form.get('accountType') as string;		
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = {
			firstName,
			lastName,
			email,
			password: hashedPassword,
			accountType
		};

		if (email === '' || password === '' || firstName === '' || lastName === '') {
			throw redirect(307, '/');
		} else {
			console.log(`attempting to sign up user firstName: ${firstName}, lastName: ${lastName} & email: ${email} with password: ${password}`);
			const updatedUser = await RugbyClubPOIService.updateUser(user);

			if (updatedUser) {
				throw redirect(303, '/profile');

			} else {
				throw redirect(307, '/');
			}
		}
	}
};
