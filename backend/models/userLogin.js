import mongoose from "mongoose";

const userLogin = mongoose.Schema(
{
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},
{
    timestamps: true,
}

);

export const User = mongoose.model('User', userLogin);