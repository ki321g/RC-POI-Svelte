import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";

export const ssr = false;

export const load: PageServerLoad = async () => {
  // const testCounties = await RugbyClubPOIService.getClubsCounties();  
  // console.log(testCounties);
  // const testClubs = await RugbyClubPOIService.getClubs();
  // console.log(testClubs)
  return {
    clubs: await RugbyClubPOIService.getClubs(),  
    clubCounties: await RugbyClubPOIService.getClubsCounties(),    
  };
};
