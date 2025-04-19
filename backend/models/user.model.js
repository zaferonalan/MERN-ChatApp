import mongoose from "mongoose"

const userShema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        reqired: true,
        unique: true
    },
    password:{
        type: String,
        minlength: 6,
        required: true,
    },
    gender:{
        type: String,
        reqired: true,
        enum:["male", "female"]
    },
    profilepic:{
        type: String,
        default: ""
    }
})

const User = mongoose.model("User", userShema)
export default User