import type { Club } from "$lib/types/rugby-club-poi-types";
import { ClubMongoose } from "$lib/models/mongo/club";

export const clubStore = {
    async find(): Promise<Club[]> {
        const clubs = await ClubMongoose.find().lean();
        return clubs;
      },
    
      async findOne(id: string): Promise<Club | null> {
        try { 
          if (id) {
          const club = await ClubMongoose.findOne({ _id: id }).lean();
          return club;
        }
        return null;
        } catch (error) {
          console.log("bad id");
        } 
      },
      
      async findBy(category: string): Promise<Club | null> {
        const clubs = await ClubMongoose.findOne({ category: category }).lean();
        return clubs;
      },  

      async findByUserId(userId: string): Promise<Club | null> {
        try{
          const clubs = await ClubMongoose.findOne({ userId: userId }).lean();
          return clubs;
        }
        catch (error) {
          console.log(error);
          return null;
        }
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

      // async updateClub (id: string, updatedClub: Club): Promise<Club | null> {
      //   try {
      //     const club = await ClubMongoose.findOne({ id: id });
      //     if (club) {
      //       club.club = updatedClub.club;
      //       club.address = updatedClub.address;
      //       club.phone = updatedClub.phone;
      //       club.email = updatedClub.email;
      //       club.website = updatedClub.website;
      //       club.latitude = updatedClub.latitude;
      //       club.longitude = updatedClub.longitude;
      //       club.description = updatedClub.description;
      //       club.category = updatedClub.category;
      //       const updatedClubObj = await club.save();
      //       return updatedClubObj;
      //     }
      //     return null;
      //   }
      //   catch (error) {
      //     console.log(error);
      //     return null;
      //   }
      // },
      async updateClub (club: Club): Promise<Club | null> {
        try {
            await ClubMongoose.updateOne({ _id: club._id }, { $set: club });    
            return club;          
        }
        catch (error) {
          console.log(error);
          return null;
        }
      },

      async update(club: Club): Promise<User | null> {
        console.log('Updating :', club._id );  
        const currentClub = await ClubMongoose.findOne({ _id: club._id }).lean();
        club._id = currentClub._id;
        console.log(club)  
        console.log("After")    
        
        const UpdatedUser = ClubMongoose.updateOne({ _id: club._id }, { $set: club });    
        return UpdatedUser;
      },
      
      async addClubImage(club: Club, imageURL: string): Promise<Club | null> {
        try {
          const currentClub = await ClubMongoose.findOne({ id: club._id}).lean();
          console.log(currentClub);
          return currentClub;
          // if(currentClub) {
          //   currentClub.img?[].push(imageURL): currentClub.img = [imageURL];
          //   const clubObj = await currentClub.save();
          //   return clubObj;
          // }
          // return null;
          // const clubObj = await ClubMongoose.findOneAndUpdate(
          //   { _id: club._id },
          //   { $push: { img: imageURL } },
          //   { new: true },
          // );
        //   console.log(clubObj);
        // return clubObj;
          }
          catch (error) {
            console.log(error);
            return null;
          }
      },
      
      async addClubImage2 (club: Club, imageURL: String): Promise<Club | null> {
        // try {
          try {  
            console.log('addClubImage club-store function');
            console.log("Before UPDATE");
            console.log("ClubId: " + club._id);
            const updateClub = await ClubMongoose.findOne({ userId: club.userId });
            updateClub.img?.push(imageURL);
            console.log(updateClub);
            const clubObj = await updateClub.save();
            
            club.description = "test";
            // const clubObj = await ClubMongoose.updateOne(
            //   { _id: club._id },
            //   { $push: { img: imageURL } },
            // );

           // console.log(club.img);
           // club.save();
             //ClubMongoose.save(club);
            // const user = await UserMongoose.findOne({ _id: club.userId }).lean();
            // console.log("user details: " + user._id);
            // console.log(user);

            
            // console.log(club);
          // const updateClub = ClubMongoose.updateOne({ $set: club });
          console.log("AFTER UPDATE");
          // console.log(club);
          return updateClub;
          
          
          // const currentClub = this.findByUserId(club.userId).lean();
          // console.log("currentClub: " + currentClub._id);
          // const club = await ClubMongoose.findOne({ _id: id}).lean();

          // club.img = [...club.img, image];
          // ClubMongoose.findOneAndUpdate(
          //   { _id: club._id },
          //   { $set: club },
          //   { upsert: true }
          // );
          
          //ClubMongoose.updateOne({ _id: club._id.toString() }, { $set: club });
          
          // const UpdatedUser = UserMongoose.updateOne({ _id: user._id }, { $set: user });
          // const updateClub = ClubMongoose.updateOne(
          //   { _id: club._id },
          //   { $addToSet: { img: image } }
          // );
          // updateOne({ _id: club._id }, { $push: { img: image } }, { upsert: true });   
          
          // const updateClub1 = ClubMongoose.findOneAndUpdate(
          //   { _id: club._id },
          //   { $push: { img: image } },
          //   { upsert: true }
          // );

          // const updateClub = ClubMongoose.updateOne(
          //   { _id: id }, 
          //   { $addToSet: { img: image } }
          // );
        
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
  
};