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


export const actions = {
    addClub: async ({ request, cookies }) => {
      const form = await request.formData();
      const firstName = form.get("firstName") as string;
      const lastName = form.get("lastName") as string;
      const email = form.get("email") as string;
      const password = form.get("password") as string;
      const accountType = form.get("accountType") as string;

      const user = {
        firstName,
        lastName,
        email,
        password,
        accountType
      };

      if (email === "" || password === "" || firstName === "" || lastName === "") {
        throw redirect(307, "/");
      } else {
        console.log(`attemting to sign up user firstName: ${firstName}, lastName: ${lastName} & email: ${email} with password: ${password}`);
        const newUser = await RugbyClubPOIService.signup(user);
  
         if (newUser) {
          throw redirect(303, "/login");
        } else {
          throw redirect(307, "/");
        }
      }
    }
  };