import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

interface jwtpayload {
    _id: mongoose.Schema.Types.ObjectId,
    username: string,
    email: string
}

const isAuth = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1]
        if(!token) throw new ApiError(400, "You are not authorised to perform this action")
    
        const user = jwt.verify(token, `${process.env.ACCESS_SECRET}`) as jwtpayload

        req.user_id = user._id
        next()
        
    } catch (error) {
        throw new ApiError(400, "Invalid token")
    }
})

export default isAuth