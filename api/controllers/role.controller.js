import Role from '../models/Roles.js';
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

// logic for Create role

export const CreateRole = async (req, res, next) => {
    try {
        if (req.body.role && req.body.role != '') {
            const newRole = new Role(req.body);
            await newRole.save();
           // return res.send("Role is Created!")
           return next(CreateSuccess(200, "Role Created"))
        } else {
           // return res.status(400).send("Bad Request")
           return next(CreateError(400, "Bad Request"))
        }
    } catch (error) {
       // return res.status(500).send("Internal server Error!")
        return next(CreateError(500, "Internal server Error!"))
    }
};

// LOgic for Update role

export const UpdateRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id })
        if (role) {
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).send("Role Updated")
        } else {
            return res.status(400).send("Role not Found")
        }
    } catch (error) {
        return res.status(500).send("Internal server Error!")
    }
};

// logic for to get all the role form DB 

export const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        return res.status(200).send(roles)

    } catch {
        return res.status(500).send("Internal server Error!")
    }
}

// logic for delete the role
export const deleteRoles = async (req, res, next)=>{
    try {
        const roleId = req.params.id;
        const role = await Role.findById({_id: roleId});
        if(role){
            await Role.findByIdAndDelete(roleId);
            return res.status(200).send("Role is deleted!!!")
        } else {
            return res.status(400).send("Role not Found")
        }
    } catch {
        return res.status(500).send("Internal server Error!")
    }
}
