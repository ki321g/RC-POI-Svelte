import type { User } from "$lib/types/rugby-club-poi-types";
import { Schema, model } from "mongoose";
import pkg from "mongoose";
const { models } = pkg;

//import { Schema } = Mongoose;
const userSchema = new Schema<User>({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: String
});

export const UserMongoose = model("User", userSchema);
//export const UserMongoose = models["User"] || model("User", userSchema);
// export const UserMongoose = mongoose.models.User || model('User', userSchema);
//export const UserMongoose = Mongoose.model("User", userSchema);