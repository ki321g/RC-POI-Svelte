import type { User } from "$lib/types/rugby-club-poi-types";
import { Schema, model } from "mongoose";
//import Mongoose from "mongoose";

//import { Schema } = Mongoose;
const userSchema = new Schema<User>({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: String
});

export const UserMongoose = model("User", userSchema);
//export const UserMongoose = Mongoose.model("User", userSchema);