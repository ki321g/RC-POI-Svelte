import axios from "axios";
import { user } from "../stores";
import type { LoggedInUser, User } from "$lib/types/rugby-club-poi-types";

export const RugbyClubPOIService = {
    //baseUrl: process.env.PUBLIC_BACKEND_API,
    //baseUrl: "http://rugbyclubpoi-f3ce2fe5ab82.herokuapp.com",
    baseUrl: "http://localhost:3000",

    async signup(user: User): Promise<boolean> {
      try {
        const response = await axios.post(`${this.baseUrl}/api/users`, user);
        return response.data.success === true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  
    async login(email: string, password: string): Promise<LoggedInUser | null> {
      try {
        console.log('email: ', email);
        console.log('password: ', password);
      //  axios.defaults.headers.common["Accept"] = "application/json";
       // axios.defaults.headers.common["Content-Type"] = "application/json";
        const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
       /*
        const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
          email,
          password,
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        */
        console.log(response.data);
        if (response.data.success) {          
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
          const userID = await axios.get(`${this.baseUrl}/api/users/${response.data._id}`);
          user.set({ _id: response.data._id, email: response.data.email, token: response.data.token });
          
          const session: LoggedInUser = {
            _id: response.data._id, 
            email: response.data.email, 
            token: response.data.token 
          };
          
          localStorage.RugbyClubPOI = JSON.stringify({
            _id: response.data._id,
            email,
            token: response.data.token,
          });
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
  };
// export const RugbyClubPOIService = {
//     baseUrl: process.env.PUBLIC_BACKEND_API,
  
//     async signup(user: User): Promise<boolean> {
//       try {
//         const response = await axios.post(`${this.baseUrl}/api/users`, user);
//         return response.data.success === true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },

// }