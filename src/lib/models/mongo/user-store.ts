import type { User } from "$lib/types/rugby-club-poi-types.js";
import { UserMongoose } from '$lib/models/mongo/user';
export const userStore = {
  async find(): Promise<User[]> {
    const users = await UserMongoose.find().lean() as User[];
    return users;
  },

  async findOne(id: string): Promise<User | null> {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean() as User | null;
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
    const user = await UserMongoose.findOne({ email: email }).lean() as User | null;
    return user;
  },

  async update(user: User): Promise<User | null> {
    console.log('Updating :', user.email);  
    const currentUser = await UserMongoose.findOne({ email: user.email }).lean();
    user._id = currentUser._id;
    console.log(user)  
    console.log("After")    
    
    const UpdatedUser = UserMongoose.updateOne({ _id: user._id }, { $set: user });    
    return UpdatedUser;
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