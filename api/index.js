import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import { seedHotelData } from './seed.js';
import hotelRoute from './routes/hotel.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/hotel", hotelRoute);

// Response Handler Middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!"
    return res.status(statusCode).json({
        success: [200,201,204].some(a=> a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    })
});



const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        if(process.argv.includes("--seed")){
            await seedHotelData();
        }       
        console.log("Connect to Database!")
    } catch (error) {
        console.error('Error connecting to Mongo', error);
    }
}
app.listen(8800, () => {
    connectMongoose();
   
})
