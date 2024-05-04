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
			const images = await imageStore.add(image);
			return JSON.parse(JSON.stringify(images));
		} catch (error) {
			return [];
		}
	},


	async addClubImage(club: Club, imageURL: string): Promise<Image[] | null> {
		try {
			console.log('addClubImage function');
			console.log(club);
			console.log('imageURL: ', imageURL);

			const image: Image = {
				clubid: club._id,
				img: imageURL
			};
			console.log(image);

			const returnedImage = await imageStore.add(image);
			// const returnedClub = await clubStore.update(club);
			console.log('addClubImage AFTER');
			console.log(returnedImage);
			return JSON.parse(JSON.stringify(returnedImage));
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	
	async updateClub(club: Club): Promise<Club[]> {
		try {
			const updatedClub = await clubStore.update(club._id, club);
			console.log(updatedClub);
			if (club !== null) {
				return updatedClub;
			}
			return [];
		} catch (error) {
			console.log(error);
			return [];
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
};
