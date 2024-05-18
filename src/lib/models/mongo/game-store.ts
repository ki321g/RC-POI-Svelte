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

      async update(game: Game): Promise<Game | null> {
        try {
          // console.log('Updating :', game._id );  
          const currentGame = await GameMongoose.findOne({ _id: game._id }).lean();
          game._id = currentGame._id;
                  
          const UpdatedGame = GameMongoose.updateOne({ _id: game._id }, { $set: game });    
          return UpdatedGame;
        } catch (error) {
          console.log(error);
          return null;
        }
      },


};