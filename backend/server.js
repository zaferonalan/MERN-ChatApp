import express from "express"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messagesRoute from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    // root route http://localhost:5000/
    res.send("Hello Word!")
})

app.use("/api/auth", authRoutes)
app.use("/api/message",messagesRoute)

app.listen(5000, () => {
    connectToMongoDB()
    console.log(`Server Running on port: ${PORT}`)
})