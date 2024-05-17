import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';


export const load: PageServerLoad = async ({ request, parent }) => {
	const { session } = await parent();
	if (session) {		

		let users = await RugbyClubPOIService.getUsers();
		// Change the password for each user
        users = users.map(user => ({
            ...user,
            password: 'HASHED_PASSWORD' // replace 'newPassword' with the new password
        }));
        console.log(users);

		return {
			// users: await RugbyClubPOIService.getUsers(),
			users: users,
		};
	}
};