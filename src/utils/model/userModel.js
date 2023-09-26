import mongoose from 'mongoose'
import { connect } from '@/utils/mongoDB';

const userModel = new mongoose.Schema({
    username: {
        type: String,
        require: [ true, 'Please provied a username'],
        unique: true
    },
    email:{
       type : String,
       require: [true, "Please provide a email"],
       unique: true
    },
    password: {
        type: String,
        require: [true, 'Please provide a password']
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

export const  User = connect.models.users || connect.model("users", userModel)