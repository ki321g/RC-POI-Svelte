import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";
export const ssr = false;

/**
 * Loads the necessary data for the chart page, including a list of rugby clubs and their associated games.
 *
 * @returns An object containing the list of clubs and games.
 */
export const load: PageServerLoad = async () => {
	return {
		clubs: await RugbyClubPOIService.getClubs(),
		games: await RugbyClubPOIService.getGames()
	};
};
