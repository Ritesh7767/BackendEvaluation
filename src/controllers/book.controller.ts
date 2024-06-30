import Book from "../models/book.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { createBookValidation } from "../zod/bookValidation.zod";

export const createBook = asyncHandler(async (req, res, next) => {

    const {title, description, content} = req.body
    if([title, description, content].some(ele => ele.trim() == "")) throw new ApiError(400, "Please provide every field")

    const isDataValid = createBookValidation.safeParse(req.body)
    if(!isDataValid.success) throw new ApiError(400, "Invalid data provided")

    const existingBook = await Book.find({title})
    if(existingBook) throw new ApiError(401, "Book already exists")

    const createdBook = await Book.create({...req.body, author: req.user_id})

    const book = await Book.findById(createdBook._id)
    if(!book) throw new ApiError(500, "Something went wrong while creating the book")

    res.status(201).json(new ApiResponse(201, book))
})

export const getBooks = asyncHandler(async (req, res, next) => {

    const books = await Book.find();
    if(!books) throw new ApiError(500, "Something went wrong while fetching the books")

    res.status(200).json(new ApiResponse(200, books))
})

export const updateBook = asyncHandler(async (req, res, next) => {

    const _id = req.query._id

    const {content} = req.body;
    if(!content) throw new ApiError(400, "Please provide the content to update")

    const updatedBook = await Book.findByIdAndUpdate({_id, $set: {content}})
    if(!updatedBook) throw new ApiError(400, "Book does not exist")

    res.status(201).json(new ApiResponse(201, updatedBook, "Book updated successfully"))
})

export const deleteBook = asyncHandler(async (req, res, next) => {

    const _id = req.query._id
    const deletedBook = await Book.findById(_id)
    if(!deletedBook) throw new ApiError(404, "Book does not exist")

    res.status(201).json(new ApiResponse(201, deletedBook, "Book deleted successfully"))
})