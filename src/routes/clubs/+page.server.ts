import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";
<<<<<<< Updated upstream
=======

export const ssr = false;
>>>>>>> Stashed changes

export const load: PageServerLoad = async () => {
  const testCounties = await RugbyClubPOIService.getClubsCounties();  
  console.log(testCounties);
  return {
    clubs: await RugbyClubPOIService.getClubs(),  
    clubCounties: await RugbyClubPOIService.getClubsCounties(),    
  };
};
