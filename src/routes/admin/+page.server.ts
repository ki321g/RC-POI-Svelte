import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';


/**
 * Loads user data and updates the password for each user.
 *
 * This function is a PageServerLoad handler that is executed on the server-side when the admin page is loaded.
 * It retrieves the list of users from the RugbyClubPOIService, updates the password for each user to 'HASHED_PASSWORD', and returns the updated user data.
 *
 * @param request - The incoming request object.
 * @param parent - The parent function that provides the session data.
 * @returns An object containing the updated list of users.
 */
export const load: PageServerLoad = async ({ request, parent }) => {
	const { session } = await parent();
	if (session) {
		let users = await RugbyClubPOIService.getUsers();
		// Change the password for each user
		users = users.map((user) => ({
			...user,
			password: 'HASHED_PASSWORD' // replace 'newPassword' with the new password
		}));
		console.log(users);

		return {
			users: users
		};
	}
};
