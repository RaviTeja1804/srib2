import "dotenv/config"
import express from "express"
import cors from "cors"
import dbConnect from "./services/dbConnect.js";

import authRoutes from "./routes/authRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

dbConnect()

app.use('/', authRoutes)
app.use('/', paymentRoutes)

app.listen(4000, () => {
    console.log("server running on port 4000")
})