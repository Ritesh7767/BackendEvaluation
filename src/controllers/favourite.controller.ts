import FavouriteBook from "../models/favouriteBook.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";

export const addToFavourite = asyncHandler(async (req, res, next) => {

    const _id = req.body
    
    const favouriteObject = await FavouriteBook.create({user: req.user_id})
    if(!favouriteObject) throw new ApiError(500, "Something went wrong")

    favouriteObject.favouriteBooks.push(_id)

    res.status(200).json(new ApiResponse(200, favouriteObject, "Book added to the favourite list"))
})
