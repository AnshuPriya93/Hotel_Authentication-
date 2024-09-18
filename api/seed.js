 import HotelJson from './hotel.json' assert { type: "json"};
import Hotel from './models/Hotel.js';

 export const seedHotelData = async () => {
    try {
        //connection with the DB
        //query to send data to DB
        await Hotel.deleteMany({});
        await Hotel.insertMany(HotelJson);
        console.log("Data seeded successfully");
    } catch (e) {
         console.log("Error", e);
     }




    // disconect from connection
 }