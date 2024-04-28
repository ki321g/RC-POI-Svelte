import type { Club } from "$lib/types/rugby-club-poi-types";
import { ClubMongoose } from "./club.js";

export const clubStore = {
    async find(): Promise<Club[]> {
        const clubs = await ClubMongoose.find().lean();
        return clubs;
      },
    
      async findOne(id: string): Promise<Club | null> {
        if (id) {
          const club = await ClubMongoose.findOne({ _id: id }).lean();
          return club;
        }
        return null;
      },

      async findBy(category: string): Promise<Club | null> {
        const clubs = await ClubMongoose.findOne({ category: category }).lean();
        return clubs;
      },  

      async findByUserId(userId: string): Promise<Club | null> {
        const clubs = await ClubMongoose.findOne({ userId: userId }).lean();
        return clubs;
      },   
    
      async add(club: Club): Promise<Club | null> {
        const newClub = new ClubMongoose(club);
        const clubObj = await newClub.save();
        return clubObj;
      },
    
      async deleteOne(id: string) {
        try {
          await ClubMongoose.deleteOne({ _id: id });
        } catch (error) {
          console.log("bad id");
        }
      },    

      async delete() {
        await ClubMongoose.deleteMany({});
      },

      async updateClub (id: string, updatedClub: Club): Promise<Club | null> {
        try {
          const club = await ClubMongoose.findOne({ id: id });
          if (club) {
            club.club = updatedClub.club;
            club.address = updatedClub.address;
            club.phone = updatedClub.phone;
            club.email = updatedClub.email;
            club.website = updatedClub.website;
            club.latitude = updatedClub.latitude;
            club.longitude = updatedClub.longitude;
            club.description = updatedClub.description;
            club.category = updatedClub.category;
            const updatedClubObj = await club.save();
            return updatedClubObj;
          }
          return null;
        }
        catch (error) {
          console.log(error);
          return null;
        }
      },

      async updateClubImage (id: string, updatedClub: Club): Promise<Club | null> {
        try {
          const club = await ClubMongoose.findOne({ id: id });
          if (club) {
            club.club = updatedClub.club;
            club.address = updatedClub.address;
            club.phone = updatedClub.phone;
            club.email = updatedClub.email;
            club.website = updatedClub.website;
            club.latitude = updatedClub.latitude;
            club.longitude = updatedClub.longitude;
            club.description = updatedClub.description;
            club.img = updatedClub.img;
            club.category = updatedClub.category;
            const updatedClubObj = await club.save();
            return updatedClubObj;
          }
          return null;
        }
        catch (error) {
          console.log(error);
          return null;
        }
      }
}