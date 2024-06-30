import User from "../models/user.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { userRegisterValidation } from "../zod/userValidation.zod";

const userRegister = asyncHandler(async (req, res, next) => {

    const {username, email, password} = req.body
    if([username, email, password].some(ele => ele.trim() == '')) throw new ApiError(400, "Please provide every field")
    
    const isDataValid = userRegisterValidation.safeParse(req.body)
    if(!isDataValid.success) throw new ApiError(400, "Invalid data provided")

    const existingUser = await User.findOne({$or: [{username},{email}]})
    if(existingUser) throw new ApiError(403, "User already exist with this email id or username")

    await User.create(req.body)
    
    const createdUser = await User.findOne({username}).select("-password -refreshToken -blacklistToken")
    if(!createdUser) throw new ApiError(500, "Something went wrong while registering the user, please try again")

    res.status(201).json(new ApiResponse(201, createdUser))
})

const userLogin = asyncHandler(async (req, res, next) => {

    const {email, password} = req.body
    if((username == "" || email == "") && password == "")
})