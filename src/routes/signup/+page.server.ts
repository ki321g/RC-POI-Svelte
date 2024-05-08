import { dev } from '$app/environment';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import { currentSession } from '$lib/stores.js';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';


export const actions = {
	signup: async ({ request, cookies }) => {
		const form = await request.formData();
		const firstName = form.get('firstName') as string;
		const lastName = form.get('lastName') as string;
		const email = form.get('email') as string;
		const password = form.get('password') as string;
		const accountType = form.get('accountType') as string;

		 // Hash the password before storing it
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
			const newUser = await RugbyClubPOIService.signup(user);

			if (newUser) {
				throw redirect(303, '/login');
			} else {
				throw redirect(307, '/');
			}
		}
	}
};
