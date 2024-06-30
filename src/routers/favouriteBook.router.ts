import { Router } from "express";
import isAuth from "../middleware/auth.middleware";
import { addToFavourite } from "../controllers/favourite.controller";
const router = Router()

router.route('/addToFavourite').post(isAuth, addToFavourite)

export default router
