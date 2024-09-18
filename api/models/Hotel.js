import mongoose, { Schema } from 'mongoose'
const bedTypeSchema = new Schema({
    room: String,
    beds: [String]
  }, { _id: false });

  const roomSchema = new Schema({
    url: String,
    id: String,
    roomType: String,
    bedTypes: [bedTypeSchema]
  }, { _id: false });

  const locationSchema = new Schema({
    lat: String,
    lng: String
  }, { _id: false });

  const facilityDetailSchema = new Schema({
    name: String,
    additionalInfo: [String]
  }, { _id: false });

  const facilitySchema = new Schema({
    name: String,
    overview: String,
    facilities: [facilityDetailSchema]
  }, { _id: false });

  const categoryReviewSchema = new Schema({
    title: String,
    score: Number
  }, { _id: false });
  const addressSchema = new Schema({
    full: String,
    postalCode: String,
    street: String,
    country: String,
    region: String
  }, { _id: false });

const HotelSchema = mongoose.Schema(
    {
        order: Number,
        url: String,
        name: String,
        type: String,
        description: String,
        stars: Number,
        rating: Number,
        reviews: Number,
        breakfast: String,
        checkIn: String,
        checkOut: String,
        checkInDate: Date,
        checkOutDate: Date,
        location: locationSchema,
        address: addressSchema,
        image: String,
        rooms: [roomSchema],
        images: [String],
        roomImages: [String],
        categoryReviews: [categoryReviewSchema],
        facilities: [facilitySchema],
        hotelChain: String,
        timeOfScrapeISO: Date
    },

)
export default mongoose.model("Hotel", HotelSchema);