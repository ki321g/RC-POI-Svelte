import { dev } from "$app/environment";
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
<<<<<<< Updated upstream
import { currentLoggedInUser } from "$lib/stores.js";
import { redirect } from "@sveltejs/kit";
=======
import { currentSession } from '$lib/stores.js';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
>>>>>>> Stashed changes

export const actions = {
    signup: async ({ request, cookies }) => {
      const form = await request.formData();
      const firstName = form.get("firstName") as string;
      const lastName = form.get("lastName") as string;
      const email = form.get("email") as string;
      const password = form.get("password") as string;
      const accountType = form.get("accountType") as string;

<<<<<<< Updated upstream
      const user = {
        firstName,
        lastName,
        email,
        password,
        accountType
      };
=======
		 // Hash the password before storing it
		 const saltRounds = 10;
		 const hashedPassword = await bcrypt.hash(password, saltRounds);	 

		const user = {
			firstName,
			lastName,
			email,
			password: hashedPassword,
			accountType
		};
>>>>>>> Stashed changes

      if (email === "" || password === "" || firstName === "" || lastName === "") {
        throw redirect(307, "/");
      } else {
        console.log(`attemting to sign up user firstName: ${firstName}, lastName: ${lastName} & email: ${email} with password: ${password}`);
        const newUser = await RugbyClubPOIService.signup(user);
  
         if (newUser) {
        //   const session = await RugbyClubPOIService.login(email, password);
          
        //   currentLoggedInUser.set(session);
        //   const userJson = JSON.stringify(session);
        //   cookies.set("RugbyClubPOI", userJson, {
        //     path: "/",
        //     httpOnly: true,
        //     sameSite: "strict",
        //     secure: !dev,
        //     maxAge: 60 * 60 * 24 * 7 // one week
        //   });
          throw redirect(303, "/login");
        } else {
          throw redirect(307, "/");
        }
      }
    }
  };