import type { Game } from "$lib/types/rugby-club-poi-types";
import { Schema, model } from "mongoose";

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