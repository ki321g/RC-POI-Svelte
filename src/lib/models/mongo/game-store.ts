import type { Game } from "$lib/types/rugby-club-poi-types";
import { GameMongoose } from "$lib/models/mongo/game";

export const gameStore = {
    async find(): Promise<Game[]> {
        const games = await GameMongoose.find().lean();
        return games;
      },
    
      async findOne(id: string): Promise<Game | null> {
          try { 
              if (id) {
                  const game = await GameMongoose.findOne({ _id: id }).lean();
                  return game;
              }
              return null;
          } catch (error) {
              console.log("bad id");
              return null;
          } 
      },
      
    
    async findGamesByClubId(id: string): Promise<Game[]> {
        try { 
            if (id) {
                const games = await GameMongoose.find({ clubid: id }).lean();
                return games;
            }
            return [];
        } catch (error) {
            console.log("bad id");
            return [];
        } 
    },
    
      async add(game: Game): Promise<Game | null> {
        const newGame = new GameMongoose(game);
        const gameObj = await newGame.save();
        return gameObj;
      },
    
      async deleteOne(id: string) {
        try {
          await GameMongoose.deleteOne({ _id: id });
        } catch (error) {
          console.log("bad id");
        }
      },    

      async delete() {
        await GameMongoose.deleteMany({});
      },

      async updateGame (id: string, updatedGame: Game): Promise<Game | null> {
        try {
          const game = await GameMongoose.findOne({ id: id });
          if (game) {
            game.home = updatedGame.home;
            game.homescore = Number(updatedGame.homescore);
            game.awayscore = Number(updatedGame.awayscore);
            game.away = updatedGame.away;
            game.gametime = updatedGame.gametime;
            game.gamelocation = updatedGame.gamelocation;
            const updatedGameObj = await game.save();
            return updatedGameObj;
          }
          return null;
        }
        catch (error) {
          console.log(error);
          return null;
        }
      },
};