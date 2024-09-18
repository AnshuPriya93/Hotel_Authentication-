import mongoose, { Schema } from 'mongoose'

const USerSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        userName: {
            type: String,
            require: true,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        profileImage: {
            type: String,
            require: true,
            default:"https://source.unsplash.com/random/200x200?sig=1"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        roles:{
            type: [Schema.Types.ObjectId],
            require:true,
            ref:"Role"
        }
    },
    {
        timestamps: true
    }    
);

export default mongoose.model("User", USerSchema);