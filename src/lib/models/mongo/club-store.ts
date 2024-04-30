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
      },

      // async addClubImage (id: string, image: string): Promise<Club | null> {
      //   try {
      //     const club = await ClubMongoose.findOne({ id: id });
      //     if (club) {
      //       club.updateOne(
      //         { $push: {img: image}},
      //         function(err, result) {
      //           if (err) {
      //             console.error(err);
      //           } else {
      //             console.log(result);
      //           }
      //         });
      //       const updatedClubObj = await ClubMongoose.findOne({ id: id });
      //       return updatedClubObj;
      //     }
      //     return null;
      //   }
      //   catch (error) {
      //     console.log(error);
      //     return null;
      //   }
      // }
      // async addClubImage (id: string, image: string): Promise<Club | null> {
      //   try {
      //     const club = await ClubMongoose.findOne({ id: id });
      //     console.log(club);
      //     if (club) {
      //       await club.updateOne({ $push: {img: image}});
      //       const updatedClubObj = await ClubMongoose.findOne({ id: id });
      //       console.log("AFTER UPDATE");
      //       console.log(updatedClubObj);
      //       return updatedClubObj;
      //     }
      //     return null;
      //   }
      //   catch (error) {
      //     console.log(error);
      //     return null;
      //   }
      // }

      // async addClubImage (id: string, image: string): Promise<Club | null> {
      //   try {
          
      //     console.log("Before UPDATE");
      //     console.log("id: " + id);
      //     console.log("image: " + image);
      //     //  if (club) {
      //      await ClubMongoose.findOneAndUpdate(
      //          { _id: id },
      //          { $push: { img: image } },
      //         );

      //       // const club = await ClubMongoose.findOne({ _id: id });
      //       // console.log(club);
      //       // if (club) {
      //         await club.updateOne({ $push: {img: image}});
      //         const updatedClubObj = await ClubMongoose.findOne({ _id: id });
      //         console.log("AFTER UPDATE");
      //         console.log(updatedClubObj);
      //         return updatedClubObj;
      //     //   }
      //     //   return null;
      //     // }

      //       // await ClubMongoose.updateOne(
      //       //   { _id: id },
      //       //   { $push: { img: image } },
      //       //  );
      //       // const updatedClubObj = await ClubMongoose.findOne({ _id: id });
      //       // console.log("AFTER UPDATE");
      //       // console.log(updatedClubObj);
      //       // return updatedClubObj;
      //     // }
      //     // return null;
      //   // }
      //   catch (error) {
      //     console.log(error);
      //     return null;
      //   }
      // },




      // async addClubImage (id: string, image: string): Promise<Club | null> {
      //   try {
      //     const club = await ClubMongoose.findOne({ _id: id }).lean();
      //     console.log(club);
      //     if (club) {
      //       await ClubMongoose.updateOne(
      //         { _id: id },
      //         { $push: { img: image } },
      //       ).lean();

      //       const updatedClubObj = await ClubMongoose.findOne({ _id: id }).lean();
      //       console.log("AFTER UPDATE");
      //       console.log(updatedClubObj);
      //       return updatedClubObj;
      //     }
      //     return null;
      //   }
      //   catch (error) {
      //     console.log(error);
      //     return null;
      //   }
      // }
      async addClubImage (club: Club): Promise<Club | null> {
        // try {
          try {  
          console.log('addClubImage club-store function');
          console.log("Before UPDATE");
          console.log("ClubId: " + club._id);
          console.log(club);
          // const club = await ClubMongoose.findOne({ _id: id}).lean();
          club.description = "test";
          // club.img = [...club.img, image];
          
          const updateClub = ClubMongoose.updateOne({ _id: club._id }, { $set: club });    
          // const updateClub = ClubMongoose.updateOne(
          //   { _id: club._id },
          //   { $addToSet: { img: image } }
          // );
          // updateOne({ _id: club._id }, { $push: { img: image } }, { upsert: true });   
          console.log("AFTER UPDATE");
          // const updateClub1 = ClubMongoose.findOneAndUpdate(
          //   { _id: club._id },
          //   { $push: { img: image } },
          //   { upsert: true }
          // );

          // const updateClub = ClubMongoose.updateOne(
          //   { _id: id }, 
          //   { $addToSet: { img: image } }
          // );
          console.log(updateClub);
          return updateClub;
          // if (club) {
          //   await ClubMongoose.updateOne(
          //     { _id: id },
          //     { $push: { img: image } },
          //   );
      
          //   const updatedClubObj = await ClubMongoose.findOne({ id: id }).lean();
          //   console.log("AFTER UPDATE");
          //   console.log(updatedClubObj);
          //   return updatedClubObj;
          // }
          // return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
     
}