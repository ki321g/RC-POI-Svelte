import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import bcrypt from 'bcrypt';
import { dev } from '$app/environment';
import { currentSession } from '$lib/stores.js';

let createdUser: any;

/**
 * Handles the POST request for user sign-up.
 *
 * @param {Object} request - The incoming request object.
 * @param {Object} cookies - The cookies associated with the request.
 * @returns {Promise<Object>} - A JSON response with the status and the created user.
 * @throws {Error} - Throws a 401 Unauthorized error if the sign-in is not recent enough.
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	let unhashedPassword = '';
	const { idToken, newUser } = await request.json();
	const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
	const decodedIdToken = await adminAuth.verifyIdToken(idToken);
	const existingUser = await RugbyClubPOIService.getLoggedInUser(newUser.email);

	if (!existingUser) {
		unhashedPassword = newUser.password;
		// Hash the password before storing it
		const saltRounds = 10;
		newUser.password = await bcrypt.hash(newUser.password, saltRounds);
		// const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

		const result = await RugbyClubPOIService.signup(newUser);
		if (result) {
			createdUser = await RugbyClubPOIService.getLoggedInUser(newUser.email);
		}
	} else {
		unhashedPassword = existingUser.password;
	}

	if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
		const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
		const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
		const optionsRugbyClubPOI = { maxAge: expiresIn, httpOnly: true, secure: !dev, path: '/' };

		cookies.set('__session', cookie, options);

		const session = await RugbyClubPOIService.login(newUser.email, unhashedPassword);
		currentSession.set(session);
		const userJson = JSON.stringify(session);
		cookies.set('RugbyClubPOI', userJson, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: 60 * 60 * 24 * 7 // one week
		});

		return json({ status: 'signedIn', user: createdUser });
	} else {
		throw error(401, 'Recent sign in required!');
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
    cookies.delete('__session', { path: '/' });
    cookies.delete('RugbyClubPOI', { path: '/' });
    return json({ status: 'signedOut' });
}