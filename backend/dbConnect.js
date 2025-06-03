import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to MongoDB")
    } catch(error) {
        console.log("Error: ", error.message)
    }
}

export default dbConnect;