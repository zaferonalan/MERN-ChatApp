import express from "express"
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";

const app = express()
dotenv.config()
const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Hello Word!")
})

app.use("/api/auth", authRoutes)

app.listen(5000, () => {
    console.log(`Server Running on port: ${PORT}`)
})