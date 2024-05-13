import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";

export const ssr = false;

export async function load({ params }) {
    const { clubId } = params;
    // const { userId } = params;
    
    console.log("ClubID:" + clubId)
    // Now you can use the id to fetch data
    const clubs = await RugbyClubPOIService.getClubByClubId(clubId);
    console.log(clubs);
    const games = await RugbyClubPOIService.getGamesByClubId(clubId);
    console.log(games);
    return {
        club: await RugbyClubPOIService.getClubByClubId(clubId),  
        games: await RugbyClubPOIService.getGamesByClubId(clubId),
        images: await RugbyClubPOIService.getImagesByClubId(clubId),     
    };
}
// export const load: PageServerLoad = async () => {
//   // const testCounties = await RugbyClubPOIService.getClubsCounties();  
//   // console.log(testCounties);
//   // const testClubs = await RugbyClubPOIService.getClubs();
//   // console.log(testClubs)
//   return {
//     // clubs: await RugbyClubPOIService.getClubs(),  
//     // clubCounties: await RugbyClubPOIService.getClubsCounties(),    
//   };
// };
