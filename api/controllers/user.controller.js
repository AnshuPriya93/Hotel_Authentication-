import User from "../models/User.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";


export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        // return res.status(200).send(users);
        return next(CreateSuccess(200, "All User", users));

    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }

};

// method to get user by its id

export const getUserByID = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return next(CreateError(404, "User not found"))
        return next(CreateSuccess(200, "Single user", user));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"))
    }
};