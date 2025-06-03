import mongoose,{Schema} from "mongoose";

const jigsawImageModel = new mongoose.Schema({
    month:{
        type: String,
        required: true
    },// e.g., "2025-06"
    prompt:{
        type: String,
        required: true
    },
    imageBase64:{
        type: String,
        required: true,
    }
}, {timestamps: true})

export default mongoose.model("JigsawImage",jigsawImageModel);