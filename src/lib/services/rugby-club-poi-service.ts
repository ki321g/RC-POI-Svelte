import axios from "axios";
//import { user } from "../stores";
import { userStore } from "$lib/models/mongo/user-store";
import { clubStore } from "$lib/models/mongo/club-store";
import type { LoggedInUser, User, Club } from "$lib/types/rugby-club-poi-types";
import { PUBLIC_BACKEND_API } from "$env/static/public";

export const RugbyClubPOIService = {
<<<<<<< Updated upstream
    baseUrl: PUBLIC_BACKEND_API,
    //baseUrl: process.env.PUBLIC_BACKEND_API
    //baseUrl: "http://rugbyclubpoi-f3ce2fe5ab82.herokuapp.com",
   // baseUrl: "http://localhost:3000",

    // async signup(user: User): Promise<boolean> {
    //   try {
    //     const response = await axios.post(`${this.baseUrl}/api/users`, user);
    //     return response.data.success === true;
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // },
    async signup(user: User): Promise<boolean> {
      try {
        const newUser = await userStore.add(user);
        return !!newUser;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async login(email: string, password: string): Promise<LoggedInUser | null> {
      try {
        console.log('email: ', email);
        console.log('password: ', password);
        const user = await userStore.findBy(email);
        const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
=======
	baseUrl: PUBLIC_BACKEND_API,
	async signup(user: User): Promise<boolean> {
		try {
			const newUser = await userStore.add(user);
			return !!newUser;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
	async login(email: string, password: string): Promise<Session | null> {
		try {
			console.log('email: ', email);
			console.log('password: ', password);
			const user = await userStore.findBy(email);
			//const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });

			console.log('user: ', user);
			// if (user !== null && user.password === password) {				
			if (user !== null) {
				const session: Session = {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					accountType: user.accountType,
					_id: user._id!.toString(),
					//token: response.data.token
				};
				return session;
			}
			return null;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
>>>>>>> Stashed changes

        console.log('user: ', user);
        if (user !== null && user.password === password) {
          const session: LoggedInUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accountType: user.accountType,
            _id: user._id!.toString(), 
            token: response.data.token
          };
          return session;
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  
    async logout(): Promise<boolean> {
      try {
        axios.defaults.headers.common["Authorization"] = "";
        user.set({ _id: "", email: "", token: "" });

      } catch (error) {
        console.log(error);
        return false;
      }
    },
  
    async getLoggedInUser(): Promise<LoggedInUser | null> {
      try {
        const response = await axios.get(`${this.baseUrl}/api/auth`);
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  
    async updateUser(user: User): Promise<boolean> {
      try {
        await axios.put(`${this.baseUrl}/api/users/${user._id}`, user);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  
    async deleteUser(userId: string): Promise<boolean> {
      try {
        await axios.delete(`${this.baseUrl}/api/users/${userId}`);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async getClubs(): Promise<Club[]> {
      try {
        const clubs = await clubStore.find();
        return JSON.parse(JSON.stringify(clubs));
      } catch (error) {
        return [];
      }
    },

    async getClubsCounties(): Promise<string[]> {
      try {
        const clubs = await clubStore.find();
        
        let clubCounties = clubs.map((club) => club.address.toUpperCase()); // Create clubCounties array
        clubCounties = [...new Set(clubCounties)]; // Remove duplicates

        return clubCounties;
      } catch (error) {
        return [];
      }
    },
    
    async getClubByUserId(userId: string): Promise<Club[]> {
      try {
        const clubs = await clubStore.findByUserId(userId);
        return JSON.parse(JSON.stringify(clubs));
      } catch (error) {
        return [];
      }
    },
  };