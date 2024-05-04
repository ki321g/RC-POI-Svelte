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
  
  async add(image: Image): Promise<Image | null> {
    try {
      // Create a new image
      // let newImage = new ImageMongoose({
      //   img: image.img, // Replace with your actual data
      //   clubid: image.clubid // Replace with your actual data
      // });
      const newImage = new ImageMongoose(image);
      // @ts-expect-error
      const imageObj = await newImage.save();
      // Save the new image to the database
      // newImage.save()
      // .then(savedImage => {
      //   console.log('Saved image:', savedImage);
      // })
      // .catch(error => {
      //   console.error('Error saving image:', error);
      // });
      return imageObj;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteOne(id: string) {
    try {
      await ImageMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async delete() {
    await ImageMongoose.deleteMany({});
  }
};