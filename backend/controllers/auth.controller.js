import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async(req, res) => {
    try {
        const { fullName, userName, password, confirmPassword ,gender } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords dont match"})
        }

        const user = await User.findOne({userName})
        if (user) {
            return res.status(400).json({error: "Username already exists"})
        }

        //Hash password here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            //Generate JWT toke here
            await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilepic: newUser.profilepic
            })
        }

    } catch (error) {
        console.log("Erorr in signup controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async(req, res) => {
    try {
        const {userName, password} = req.body
        const user = await User.findOne({userName})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilepic: user.profilepic
        })

    } catch (error) {
        console.log("Erorr in login controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged out successfuly"})
    } catch (error) {
        console.log("Erorr in logout controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}