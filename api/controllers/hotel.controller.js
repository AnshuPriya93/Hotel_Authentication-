import Hotel from '../models/Hotel.js'
import { CreateSuccess } from '../utils/success.js';
import { CreateError } from '../utils/error.js';
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.find();
         return next(CreateSuccess(200, "All the hotel details fetched", hotel))
       // return{status: 200, data: hotel };
        
    } catch (error) {     
        return next(CreateError(500, "Internal server Error!"))
    }
};
