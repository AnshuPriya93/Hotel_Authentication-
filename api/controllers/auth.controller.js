import Roles from "../models/Roles.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js"
import UserToken from "../models/UserToken.js";


export const registerUser = async (req, res, next) => {
    // checking is role is USER the to create a new user
    const role = await Roles.find({ role: 'User' });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        roles: role
    })
    await newUser.save();
    
    return next(CreateSuccess(200, "Registerm Successfully"));   
};

//------------------- Register as admin ----------------------------//

export const registerAdmin = async (req, res, next) => {
    // checking is role is USER the to create a new user
    const role = await Roles.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        isAdmin: true,
        roles: role
    })
    await newUser.save();
    
    return next(CreateSuccess(200, "User Registerm Successfully"));   
};

export const userLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        .populate("roles", "role");
        const { roles } = user;
        if (!user) {
            return res.status(404).send("User not found")
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).send("Password is in-correct")            
        }

      const token = jwt.sign(
        {id: user._id, isAdmin: user.isAdmin, roles: roles},
        process.env.JWT_SECRET
      );
      //sending_token in the cookie    
       //return next(CreateSuccess(200, "login Registerm Successfully"));  
       res.cookie("access_token", token, {httpOnly:true})
       .status(200)
       .json({
        status: 200,
        message: "Login success",
        data: user
       })
    } catch (error) {
        return res.status(500).send("Internal server Error!")
    }
}

//--------------------- Sending Email--------------------------//

export const sendEmail = async (req, res, next)=>{
const email = req.body.email;
const user = await User.findOne({email:{$regex:'^'+email+'$',$options:'i'}})
if(!user){
    return next(CreateError(404, "User not found to reset the email"))
}
const payload ={
    email: user.email
}
const expireTime = 300;
const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: expireTime});

// store the token
const newToken= new UserToken({
    userId:user._id,
    token:token
})

const mailTransporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"anshu.priyarandhawa@gmail.com",
        pass:"fohykwjhizxqnmhr"
    }
});
let mailDetails ={
    form:"anshu.priyarandhawa@gmail.com",
    to:email,
    subject: "Rest Pasword",
    html:`
    <html>    
    <head>
     <title>Password Rest Request</title>     
    </head>
    <body>
     <h1>Password Rest Request</h1>
     <p>Dear ${user.userName},</p>
     <p> we have recevied a request to rest  your account with bookingapr.com to complete the password reset process, please check on the button </p>
     <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color:#4CAF50; color:white; padding:14px 20px; border:none; cursor:pointer; border-radius:4px;">Reset button</button></a>
     <p>Please note that this link is only valid for 5 mmins. If you did not request a password reset please disregard thi smessage </p>
     <p>Thank you!</p>
    </body>
    </html> 
    `};
    mailTransporter.sendMail(mailDetails, async(e, data)=>{
        if(e){
            console.log(e);
            return next(CreateError(500, "Something went wrong while sending email"))
        }else{
            await newToken.save();
            // save the token
            return next(CreateSuccess(200, "Email Sent sucessfuly"));   
        }
    })


}

// ----------------------Reset Password -----------------------//

export const resetPassword = async (req, res, next)=>{
const token = req.body.token // access the toke which user is sending from angular
const newPassword = req.body.password;  // access the new password which user is sending from angular

// verify the token
jwt.verify(token, process.env.JWT_SECRET, async(e, data)=>{
    if(e){
        return next(CreateError(500, "Reset link is expried"))        
    }else{
        const response = data; // in data we are email from frontend
        // verfity if email exist
        const user = await User.findOne({email:{$regex:'^'+response.email+'$',$options:'i'}})
       // if we find the email we will use "salt" to encrypt the password
       const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(newPassword, salt);
    user.password = encryptPassword;
    try{
const updatedUser = await User.findOneAndUpdate(
    {_id: user._id},
    {$set:user},
    {new:true}
)
return next(CreateSuccess(200, "PAssword Success"))
    }catch(e){
        return next(CreateError(500, "Something went wrongs while reseting the password!"))
    }
    }
});

}