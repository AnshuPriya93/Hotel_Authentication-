import express from 'express';
import { getHotel } from '../controllers/hotel.controller.js'


const router = express.Router();

router.get('/', getHotel);


 export default router;