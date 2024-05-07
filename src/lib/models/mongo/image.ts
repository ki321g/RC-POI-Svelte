import type { Image, Club } from "$lib/types/rugby-club-poi-types";
import { Schema, model } from "mongoose";
import pkg from "mongoose";
const { models } = pkg;

//import { Schema } = Mongoose;
const imageSchema = new Schema<Image>({
    img: String,
	// width: Number,
	// height: Number,
	// thumbnailURL: String,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	clubid: {
		type: Schema.Types.ObjectId,
		ref: "Club",
	  }, 
		
});

export const ImageMongoose = model('Image', imageSchema);
//export const ImageMongoose = models["Image"] || model("Image", imageSchema);
