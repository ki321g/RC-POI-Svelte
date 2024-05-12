import type { Image } from "$lib/types/rugby-club-poi-types.js";
import { ImageMongoose } from '$lib/models/mongo/image';

export const imageStore = {
  async find(): Promise<Image[]> {
    const images = await ImageMongoose.find().lean() as Image[];
    return images;
  },

  async findOne(id: string): Promise<Image | null> {
    if (id) {
      const image = await ImageMongoose.findOne({ _id: id }).lean() as Image | null;
      return image;
    }
    return null;
  },

   

  async findByClubId(clubId: string): Promise<Image | null> {
    try{
      // console.log('findByClubId image-store function');
      // console.log(clubId);
      const images = await ImageMongoose.find({ clubid: clubId }).lean() as Image | null;
      
      return images;
    }
    catch (error) {
      console.log(error);
      return null;
    }
  },   
  
  async add(image: Image): Promise<Image | null> {
    try {
      // console.log('addImage image-store function');
			// console.log(image);
      const newImage = new ImageMongoose(image);
      const imageObj = await newImage.save();
      // console.log('Saved image');
      // console.log(imageObj)
      return imageObj;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteOne(id: string) {
    try {
      // console.log('deleteOne image-store function');  
      // console.log("id: ", + id )
      await ImageMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("Error deleting image:", error.message);
      console.log("bad id");
    }
  },

  async delete() {
    await ImageMongoose.deleteMany({});
  }
};