import mongoose,{Schema} from "mongoose";

const userModel = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 1
    },
    pieces: {
        type: [Number],
        default: []
    }
}, {timestamps: true})

export default mongoose.model("User",userModel);