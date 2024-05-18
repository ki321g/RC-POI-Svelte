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
	const { userId } = await request.json();
	await RugbyClubPOIService.deleteUser(userId);	
	return json({ status: 200});
};
