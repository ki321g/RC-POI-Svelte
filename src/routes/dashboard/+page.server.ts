import type { LoggedInUser } from "$lib/types/rugby-club-poi-types";
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";
import cookie from 'cookie';


export const load: PageServerLoad = async ({ request, cookies }) => {
	const cookieStr = cookies.get("RugbyClubPOI") as string;
	const session = JSON.parse(cookieStr) as LoggedInUser;
	const UserId = session._id;	
	const testing = await RugbyClubPOIService.getClubByUserId(UserId);	

	console.log(`UserId: ${UserId}`);
	console.log(testing);
	return {
	clubs: await RugbyClubPOIService.getClubByUserId(UserId),
  	};
};