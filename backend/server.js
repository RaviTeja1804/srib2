import express from "express"
import cors from "cors"
import dbConnect from "./dbConnect.js";
import authRoutes from "./routes/authRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import jigsawImageRoutes from "./routes/jigsawImageRoutes.js"
import dotenv from "dotenv";

dotenv.config();
dbConnect()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/', authRoutes)
app.use('/', paymentRoutes)
app.use('/',jigsawImageRoutes)

app.listen(4000, () => {
    console.log("server running on port 4000")
})