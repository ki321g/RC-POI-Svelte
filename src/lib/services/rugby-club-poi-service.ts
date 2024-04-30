import axios from 'axios';
//import { user } from "../stores";
import { userStore } from '$lib/models/mongo/user-store';
import { clubStore } from '$lib/models/mongo/club-store';
import type { Session, User, Club } from '$lib/types/rugby-club-poi-types';
import { PUBLIC_BACKEND_API } from '$env/static/public';

export const RugbyClubPOIService = {
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
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });

			console.log('user: ', user);
			if (user !== null && user.password === password) {
				const session: Session = {
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

	async getLoggedInUser(email: string): Promise<Session | null> {
		try {
			const user = await userStore.findBy(email);
			console.log('user: ', user);
			if (user !== null) {
				return user;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async updateUser(user: User): Promise<boolean> {
		try {
			const updatedUser = await userStore.update(user);
			console.log(updatedUser);
			if (user !== null) {
				return updatedUser;
			}
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

	async addClub(club: Club): Promise<Club[]> {
		try {
			const clubs = await clubStore.add(club);
			return JSON.parse(JSON.stringify(clubs));
		} catch (error) {
			return [];
		}
	},

	async addClubImage(club: Club): Promise<Club[] | null> {
		try {
			console.log('addClubImage function');
			console.log(club);
			// console.log('image: ', image);

			const returnedClub = await clubStore.addClubImage(club);
			console.log('addClubImage AFTER');
			console.log(returnedClub);
			return returnedClub
			// JSON.parse(JSON.stringify(returnedClub));
		} catch (error) {
			return [];
		}
	}
};
