import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import bcrypt from 'bcrypt';

let createdUser: any;

/**
 * Handles the POST request to update a user's information.
 *
 * @param {Object} request - The incoming request object.
 * @param {Object} cookies - The cookies associated with the request.
 * @returns {Promise<Response>} - A JSON response with the updated user information.
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	let unhashedPassword = '';
	const { newUser } = await request.json();
	const existingUser = await RugbyClubPOIService.getLoggedInUser(newUser.email);

	if (newUser.password === 'HASHED_PASSWORD') {
		newUser.password = existingUser.password;
		createdUser = await RugbyClubPOIService.updateUser(newUser);
		return json({ status: 200, user: newUser });
	} else {
		unhashedPassword = newUser.password;

		// Hash the password before storing it
		const saltRounds = 10;
		newUser.password = await bcrypt.hash(newUser.password, saltRounds);

		createdUser = await RugbyClubPOIService.updateUser(newUser);
		return json({ status: 200, user: newUser });
	}
};
