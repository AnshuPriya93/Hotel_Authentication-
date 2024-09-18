import express from 'express';
import { getAllUser, getUserByID } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// get all User
// verfiyAdmin -> means only an admin can see all the user so we are calling verfiyadmin method 
router.get('/', verifyAdmin, getAllUser);


// get by Id
// verifyUser -> means only an user the data related to so we are calling verifyUser method 
router.get('/:id', verifyUser, getUserByID);

export default router;