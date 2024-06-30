import { Router } from "express";
import { createBook, deleteBook, getBooks, updateBook } from "../controllers/book.controller";
import isAuth from "../middleware/auth.middleware";
const router = Router()

router.route('/createBook').post(isAuth, createBook)
router.route('/getBooks').post(getBooks)
router.route('/updateBook').post(isAuth, updateBook)
router.route('/deleteBook').post(isAuth, deleteBook)

export default router
