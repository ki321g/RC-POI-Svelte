import type { Club } from "$lib/types/rugby-club-poi-types";
import { Schema, model } from "mongoose";

const clubSchema = new Schema<Club>({  
  _id: {
    type: Schema.Types.ObjectId,
    ref: "_id",
  },
  club: String,
  address: String, 
  phone: String,
  email: String,
  website: String,
  latitude: String,
  longitude: String,
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },  
  img: [String],
  category: String,
});

export const ClubMongoose = model("Club", clubSchema);