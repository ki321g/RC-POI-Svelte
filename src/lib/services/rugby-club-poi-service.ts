import { userStore } from '$lib/models/mongo/user-store';
import { clubStore } from '$lib/models/mongo/club-store';
import { gameStore } from '$lib/models/mongo/game-store';
import { imageStore } from '$lib/models/mongo/image-store';
import type { Session, User, Club, Game, Image } from '$lib/types/rugby-club-poi-types';
import { PUBLIC_BACKEND_API } from '$env/static/public';



export const RugbyClubPOIService = {
	baseUrl: PUBLIC_BACKEND_API,	
	
	/**
	 * signs up a new user.
	 *
	 * @param user - The user object to be signed up.
	 * @returns A Promise that resolves to `true` if the user was successfully signed up, or `false` if there was an error.
	 */
	async signup(user: User): Promise<boolean> {
		try {
			const newUser = await userStore.add(user);
			return !!newUser;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
	/**
	 * Attempts to log in a user with the provided email and password.
	 *
	 * @param email - The email address of the user to log in.
	 * @param password - The password of the user to log in.
	 * @returns A `Session` object containing the user's information if the login is successful, or `null` if the login fails.
	 */
	async login(email: string, password: string): Promise<Session | null> {
		try {
			console.log('email: ', email);
			console.log('password: ', password);
			const user = await userStore.findBy(email);

			console.log('user: ', user);
			if (user !== null) {
				const session: Session = {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					accountType: user.accountType,
					_id: user._id!.toString()
				};
				return session;
			}
			return null;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	/**
	 * Retrieves the logged-in user based on the provided email.
	 *
	 * @param email - The email address of the user to retrieve.
	 * @returns A Promise that resolves to the user if found, or null if not found.
	 */
	async getLoggedInUser(email: string): Promise<User | null> {
		try {
			const user = await userStore.findBy(email);
			if (user !== null) {
				return user;
			}
			return null;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
	
	/**
	 * retrieves a list of users from the user store.
	 * @returns A Promise that resolves to an array of `User` objects, or `null` if an error occurs.
	 */
	async getUsers(): Promise<User[] | null> {
		try {
			const users = await userStore.find();
			return JSON.parse(JSON.stringify(users));
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	/**
	 * Updates a user in the system.
	 * @param user - The user to be updated.
	 * @returns `true` if the user was successfully updated, `false` otherwise.
	 */
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

	/**
	 * Deletes a user from the system.
	 * @param userId - The ID of the user to delete.
	 * @returns `true` if the user was successfully deleted, `false` otherwise.
	 */
	async deleteUser(userId: string): Promise<boolean> {
		try {
			await userStore.deleteOne(userId);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	/**
	 * Retrieves a list of all rugby clubs.
	 * @returns {Promise<Club[]>} A promise that resolves to an array of `Club` objects.
	 */
	async getClubs(): Promise<Club[]> {
		try {
			const clubs = await clubStore.find();
			return JSON.parse(JSON.stringify(clubs));
		} catch (error) {
			return [];
		}
	},

	/**
	 * Retrieves a list of unique counties where rugby clubs are located.
	 *
	 * @returns {Promise<string[]>} An array of unique county names in uppercase.
	 */
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
	/**
	 * Retrieves a club by its unique identifier.
	 *
	 * @param clubId - The unique identifier of the club to retrieve.
	 * @returns A Promise that resolves to an array of `Club` objects, or an empty array if the club is not found.
	 */
	async getClubByClubId(clubId: string): Promise<Club[]> {
		try {
			const clubs = await clubStore.findOne(clubId);	
			return JSON.parse(JSON.stringify(clubs));
		} catch (error) {
			return [];
		}
	},

	/**
	 * Retrieves a list of clubs associated with the specified user ID.
	 *
	 * @param userId - The ID of the user to retrieve clubs for.
	 * @returns A Promise that resolves to an array of `Club` objects, or an empty array if an error occurs.
	 */
	async getClubByUserId(userId: string): Promise<Club[]> {
		try {
			const clubs = await clubStore.findByUserId(userId);
			return JSON.parse(JSON.stringify(clubs));
		} catch (error) {
			return [];
		}
	},

	/**
	 * Adds a new rugby club to the club store.
	 *
	 * @param club - The club to be added.
	 * @returns A Promise that resolves to an array of all clubs, including the newly added club.
	 */
	async addClub(club: Club): Promise<Club[]> {
		try {
			const clubs = await clubStore.add(club);
			return JSON.parse(JSON.stringify(clubs));
		} catch (error) {
			return [];
		}
	},
	
	/**
	 * Adds an image to the image store and returns the updated list of images.
	 *
	 * @param image - The image to be added.
	 * @returns A Promise that resolves to the updated list of images, or an empty array if an error occurs.
	 */
	async addImage(image: Image): Promise<Image[]> {
		try {
			const images = await imageStore.add(image);
			return JSON.parse(JSON.stringify(images));
		} catch (error) {
			return [];
		}
	},
	
	/**
	 * Retrieves a list of images associated with the specified rugby club.
	 *
	 * @param clubId - The unique identifier of the rugby club.
	 * @returns A Promise that resolves to an array of `Image` objects associated with the specified club. If an error occurs, an empty array is returned.
	 */
	async getImagesByClubId(clubId: string): Promise<Image[]> {
		try {
			const images = await imageStore.findByClubId(clubId);
			return JSON.parse(JSON.stringify(images));
		} catch (error) {
			return [];
		}
	},

	
	 /**
	 * Deletes an image from the image store.
	 *
	 * @param imageId - The ID of the image to delete.
	 * @returns `true` if the image was successfully deleted, `false` otherwise.
	 */
	async deleteImage(imageId: string): Promise<boolean> {
		try {
			await imageStore.deleteOne(imageId);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
	
	/**
	 * Updates a rugby club in the club store and returns the updated club.
	 *
	 * @param club - The club to be updated.
	 * @returns A Promise that resolves to an array of updated clubs, or an empty array if an error occurs.
	 */
	async updateClub(club: Club): Promise<Club[]> {
		try {
			const updatedClub = await clubStore.update(club);
			if (club !== null) {
				return updatedClub;
			}
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	
	 /**
	 * Deletes a rugby club from the database.
	 * @param clubId - The ID of the club to delete.
	 * @returns `true` if the club was successfully deleted, `false` otherwise.
	 */
	async deleteClub(clubId: string): Promise<boolean> {
		try {
			await clubStore.deleteOne(clubId);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	/**
	 * Retrieves a list of games from the game store.
	 * @returns {Promise<Game[]>} A promise that resolves to an array of `Game` objects.
	 */
	async getGames(): Promise<Game[]> {
		try {
			const games = await gameStore.find();
			return JSON.parse(JSON.stringify(games));
		} catch (error) {
			return [];
		}
	},
	
	/**
	 * Retrieves a list of games for the specified rugby club.
	 *
	 * @param clubId - The ID of the rugby club to retrieve games for.
	 * @returns A Promise that resolves to an array of `Game` objects, or an empty array if an error occurs.
	 */
	async getGamesByClubId(clubId: string): Promise<Game[]> {
		try {
			const games = await gameStore.findGamesByClubId(clubId);
			return JSON.parse(JSON.stringify(games));
		} catch (error) {
			return [];
		}
	},

	/**
	 * Retrieves a game by its unique identifier.
	 *
	 * @param id - The unique identifier of the game to retrieve.
	 * @returns A Promise that resolves to an array of `Game` objects, or an empty array if the game is not found.
	 */
	async getGameById(id: string): Promise<Game[]> {
		try {
			const game = await gameStore.findOne(id);
			return JSON.parse(JSON.stringify(game));
		} catch (error) {
			return [];
		}
	},

	/**
	 * Adds a new game to the game store and returns the updated list of games.
	 *
	 * @param game - The game to be added.
	 * @returns A Promise that resolves to the updated list of games, or an empty array if an error occurs.
	 */
	async addGame(game: Game): Promise<Game[]> {
		try {
			const newGame = await gameStore.add(game);
			return JSON.parse(JSON.stringify(newGame));
		} catch (error) {
			return [];
		}
	},

	
	/**
	 * Deletes a game from the game store.
	 * @param gameId - The ID of the game to delete.
	 * @returns `true` if the game was successfully deleted, `false` otherwise.
	 */
	async deleteGame(gameId: string): Promise<boolean> {
		try {
			await gameStore.deleteOne(gameId);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	/**
	 * Updates a game in the game store and returns the updated game.
	 *
	 * @param game - The game to be updated.
	 * @returns The updated game, or an empty array if an error occurs.
	 */
	async updateGame(game: Game): Promise<Game[]> {
		try {
			const updatedGame = await gameStore.update(game);
			if (game !== null) {
				return updatedGame;
			}
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
};
