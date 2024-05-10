import axios from 'axios';
//import { user } from "../stores";
import { userStore } from '$lib/models/mongo/user-store';
import { clubStore } from '$lib/models/mongo/club-store';
import { gameStore } from '$lib/models/mongo/game-store';
import { imageStore } from '$lib/models/mongo/image-store';
import type { Session, User, Club, Game, Image } from '$lib/types/rugby-club-poi-types';
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

	async getLoggedInUser(email: string): Promise<User | null> {
		try {
			const user = await userStore.findBy(email);
			console.log('user: ', user);
			if (user !== null) {
				return user;
			}
			return null;
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
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async deleteUser(userId: string): Promise<boolean> {
		try {
			await userStore.deleteOne(userId);
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
			clubCounties.sort(); // Sorts Clubs

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
	
	async addImage(image: Image): Promise<Image[]> {
		try {
			// console.log('addImage function');
			// console.log(image);
			const images = await imageStore.add(image);
			return JSON.parse(JSON.stringify(images));
		} catch (error) {
			return [];
		}
	},
	
	async getImagesByClubId(clubId: string): Promise<Image[]> {
		try {
			// console.log('getImagesByClubId function');
			const images = await imageStore.findByClubId(clubId);
			return JSON.parse(JSON.stringify(images));
		} catch (error) {
			return [];
		}
	},

	
	async deleteImage(imageId: string): Promise<boolean> {
		try {
			await imageStore.deleteOne(imageId);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
	
	async updateClub(club: Club): Promise<Club[]> {
		try {
			// console.log("updateClub function");
			// console.log("clubID: ", club._id);
			const updatedClub = await clubStore.update(club);
			// console.log(updatedClub);
			if (club !== null) {
				return updatedClub;
			}
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	
	async deleteClub(clubId: string): Promise<boolean> {
		try {
			await clubStore.deleteOne(clubId);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async getGames(): Promise<Game[]> {
		try {
			const games = await gameStore.find();
			return JSON.parse(JSON.stringify(games));
		} catch (error) {
			return [];
		}
	},
	
	async getGamesByClubId(clubId: string): Promise<Game[]> {
		try {
			const games = await gameStore.findGamesByClubId(clubId);
			return JSON.parse(JSON.stringify(games));
		} catch (error) {
			return [];
		}
	},

	async getGameById(id: string): Promise<Game[]> {
		try {
			const game = await gameStore.findOne(id);
			return JSON.parse(JSON.stringify(game));
		} catch (error) {
			return [];
		}
	},

	async addGame(game: Game): Promise<Game[]> {
		try {
			const newGame = await gameStore.add(game);
			return JSON.parse(JSON.stringify(newGame));
		} catch (error) {
			return [];
		}
	},

	
	async deleteGame(gameId: string): Promise<boolean> {
		try {
			await gameStore.deleteOne(gameId);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async updateGame(game: Game): Promise<Game[]> {
		try {
			// console.log("updateGame function");
			// console.log("gameID: ", game._id);
			const updatedGame = await gameStore.update(game);
			if (game !== null) {
				return updatedGame;
			}
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	},
};
