import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import Comment from "../models/comment.model";
import Book from "../models/book.model";
import mongoose from "mongoose";
import ApiResponse from "../utils/apiResponse";

interface commentedBook {
    _id: mongoose.Schema.Types.ObjectId
}

export const commentOnBooks = asyncHandler(async (req, res, next) => {

    const _id = req.query._id

    const {comment} = req.body
    if(!comment) throw new ApiError(400, "Review can't be empty")

    const book = await Book.findById(_id)
    if(!book) throw new ApiError(404, "Book does not exist")

    const commentedObject = await Comment.create({user: req.user_id, book: _id, comment}) as commentedBook
    if(!commentedObject) throw new ApiError(500, "Something went wrong , please try again")

    book.comments.push(commentedObject._id)
    book.save({validateBeforeSave: false})

    res.status(201).json(new ApiResponse(201, book, "Comment recorded"))
})

export const updateComment = asyncHandler(async (req, res, next) => {

    const _id = req.query._id

    const {comment} = req.body
    if(comment == "") throw new ApiError(400, "Please provide updated comment")

    const commentedObject = await Comment.findByIdAndUpdate({_id, $set: {comment}})
    if(!commentedObject) throw new ApiError(404, "Invalid operation")

    res.status(201).json(new ApiResponse(201, commentedObject, "Comment updated successfully"))
})

export const deleteComment = asyncHandler(async (req, res, next) => {

    const _id = req.query._id

    const commentObject = await Comment.findByIdAndDelete(_id)
    if(!commentObject) throw new ApiError(404, "Invalid operation")

    res.status(201).json(new ApiResponse(201, commentObject))
})

