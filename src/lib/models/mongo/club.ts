import type { Club } from "$lib/types/rugby-club-poi-types";
import mongoose, { Schema, model } from "mongoose";
import pkg from "mongoose";
const { models } = pkg;

const clubSchema = new Schema<Club>({    
  club: String,
  address: String, 
  phone: String,
  email: String,
  website: String,
  latitude: String,
  longitude: String,
  description: String,	
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },  
  img: [String],
  category: String,
});

  export const ClubMongoose = model('Club', clubSchema);
  // export const ClubMongoose = mongoose.models.Club || model("Club", clubSchema);
  // export const ClubMongoose = models["Club"] || model("Club", clubSchema);