import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";

export const ssr = false;
export const load: PageServerLoad = async () => {
  return {
    clubs: await RugbyClubPOIService.getClubs(),  
    clubCounties: await RugbyClubPOIService.getClubsCounties(),    
  };
};
