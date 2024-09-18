import express from 'express';
import { registerUser,userLogin, registerAdmin, sendEmail,resetPassword } from "../controllers/auth.controller.js"

const router = express.Router();

// Register in DB as user
router.post('/register', registerUser)

//login
router.post('/login', userLogin)

// Register as Admin

router.post('/register-admin',registerAdmin)

// reset password
router.post('/send-email', sendEmail)

// reset password
router.post('/reset-password', resetPassword)



export default router;