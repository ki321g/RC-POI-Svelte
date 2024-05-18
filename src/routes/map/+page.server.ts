import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";
import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';

export const ssr = false;
export const load: PageServerLoad = async () => {
    let allClubs = await RugbyClubPOIService.getClubs();
  return {
    clubs: allClubs,
  };
};