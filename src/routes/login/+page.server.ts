import { dev } from '$app/environment';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';

import { currentSession } from '$lib/stores.js';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {
	login: async ({ request, cookies }) => {
	  const form = await request.formData();
	  const email = form.get('email') as string;
	  const password = form.get('password') as string;
  
	  if (email === '' || password === '') {
		throw redirect(307, '/');
	  } else {
		console.log(`Attempting to log in email: ${email} with password: ${password}`);
  
		// Fetch the user from the database
		const user = await RugbyClubPOIService.getLoggedInUser(email);

		console.log(user);
  
		if (user) {
		  // Compare the provided password with the stored hash
		  const match = await bcrypt.compare(password, user.password);
  
		  if (match) {
			// The passwords match, log the user in
			const session = await RugbyClubPOIService.login(email, password);
			currentSession.set(session);
			const userJson = JSON.stringify(session);
			cookies.set('RugbyClubPOI', userJson, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev,
				maxAge: 60 * 60 * 24 * 7 // one week
			});
			throw redirect(303, '/dashboard');
		  } else {
			// The passwords do not match, throw an error
			throw new Error('Invalid password');
		  }
		} else {
		  // The user does not exist, throw an error
		  throw new Error('User not found');
		}
	  }
	},
  };

