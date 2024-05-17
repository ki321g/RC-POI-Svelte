import type { Game } from "$lib/types/rugby-club-poi-types";
import mongoose,{ Schema, model } from "mongoose";
import pkg from "mongoose";
const { models } = pkg;
const gameSchema = new Schema<Game>({    
    home: String,
	homescore: Number,
	awayscore: Number,
	away: String,
	gametime: String,
	gamelocation: String,	
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	clubid: {
		type: Schema.Types.ObjectId,
		ref: "Club",
	},
});


export const GameMongoose = model("Game", gameSchema);
// export const GameMongoose = mongoose.models.Game || model("Game", gameSchema);
//export const GameMongoose = models["Game"] || model("Game", gameSchema);