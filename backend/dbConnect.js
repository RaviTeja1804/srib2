import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://ravitejakarnati04:Karnati%40407@cluster0.ntfksr9.mongodb.net/jigsaw?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connected to MongoDB")
    } catch(error) {
        console.log("Error: ", error.message)
    }
}

export default dbConnect;