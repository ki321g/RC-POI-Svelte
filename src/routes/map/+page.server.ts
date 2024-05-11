import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";

export const ssr = false;

export const load: PageServerLoad = async () => {
    // const findClubs = await RugbyClubPOIService.getClubs();
    // console.log(findClubs)
    
  return {
    clubs: await RugbyClubPOIService.getClubs(),
  };
};