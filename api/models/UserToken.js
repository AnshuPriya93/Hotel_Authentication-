import mongoose, { Schema } from 'mongoose'
const TokenSchema = mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            require: true,
            ref:"User"
        },
        token:{
            type: String,
            require:true
        },
        createAt:{
            type:Date,
            default:Date.now,
            expires: 300

        }


    }
);
export default mongoose.model("Token", TokenSchema)