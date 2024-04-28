import type { LoggedInUser } from "$lib/types/rugby-club-poi-types";
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit"
import { goto } from "$app/navigation";
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


export const actions = {
  addclub: async ({ request, cookies }) => {
    const cookieStr = cookies.get("RugbyClubPOI") as string;
    const session = JSON.parse(cookieStr) as LoggedInUser;
    const userId = session._id;	

      const form = await request.formData();
      const club = form.get("club") as string;
      const address = form.get("address") as string;
      const phone = form.get("phone") as string;
      const website = form.get("website") as string;
      const latitude = form.get("latitude") as string;
      const longitude = form.get("longitude") as string;
      const email = form.get("email") as string;
      const category = form.get("category") as string;
      const description = form.get("description") as string;
      const img = "";

      const addClub = {
        club,
        address,
        phone,
        website,
        latitude,
        longitude,
        email,
        category,
        description,
        userId
      };
      
      console.log(addClub)
      if (club === "" || address === "" || phone === "" || website === "" || latitude === "" || longitude === "" || email === "" || category === "" || description === "") {
        throw redirect(307, "/");
      } else {
        console.log(`attemting to create club: ${club}, category: ${category} & email: ${email}`);
        const newClub = await RugbyClubPOIService.addClub(addClub);
  
         if (newClub) {
          throw redirect(303, "/dashboard");
        } else {
          throw redirect(307, "/");
        }
      }
    }
  };