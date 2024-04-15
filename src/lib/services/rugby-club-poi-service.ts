import axios from "axios";
import type { LoggedInUser, User } from "$lib/types/rugby-club-poi-types";

export const RugbyClubPOIService = {
    baseUrl: process.env.PUBLIC_BACKEND_API,
  
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
        const response = await axios.post(`${this.baseUrl}/api/auth`, {
          email,
          password,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  
    async logout(): Promise<boolean> {
      try {
        await axios.delete(`${this.baseUrl}/api/auth`);
        return true;
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