import type { Club } from "$lib/types/rugby-club-poi-types";
import { Schema, model } from "mongoose";

const clubSchema = new Schema<Club>({
  club: String,
  address: String, 
  phone: String,
  email: String,
  website: String,
  latitude: String,
  longitude: String,
  description: String,
  category: String,
  img: [String],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  _id: {
    type: Schema.Types.ObjectId,
    ref: "_id",
  },
});

export const ClubMongoose = model("Club", clubSchema);