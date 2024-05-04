import { dev } from '$app/environment';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import { currentSession } from '$lib/stores.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email') as string;
		const password = form.get('password') as string;
		if (email === '' || password === '') {
			throw redirect(307, '/');
			//throw redirect(307, "/login?error=Please enter both email and password");
		} else {
			console.log(`attemting to log in email: ${email} with password: ${password}`);
			const session = await RugbyClubPOIService.login(email, password);

			if (session) {
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
				throw redirect(307, '/');
			}
		}
	}
};
