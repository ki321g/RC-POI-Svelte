import type { User } from "$lib/types/rugby-club-poi-types.js";
import { UserMongoose } from '$lib/models/mongo/user';
export const userStore = {
  async find(): Promise<User[]> {
    const users = await UserMongoose.find().lean();
    return users;
  },

  async findOne(id: string): Promise<User | null> {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async add(user: User): Promise<User | null> {
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();
    return userObj;
  },

  async findBy(email: string): Promise<User | null> {
    console.log('Finding user by email:', email);    
    // console.log(UserMongoose.collection.findOne({ email: email});
    // const user = await UserMongoose.collection.findOne({ email: email}).lean();
    const user = await UserMongoose.findOne({ email: email }).lean();
    return user;
  },

  async deleteOne(id: string) {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async delete() {
    await UserMongoose.deleteMany({});
  }
};