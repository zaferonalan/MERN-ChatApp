import express from "express"
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(express.json())

app.get("/", (req, res) => {
    // root route http://localhost:5000/
    res.send("Hello Word!")
})

app.use("/api/auth", authRoutes)

app.listen(5000, () => {
    connectToMongoDB()
    console.log(`Server Running on port: ${PORT}`)
})