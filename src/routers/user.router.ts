import { Router } from "express";
import { userLogin, userRegister } from "../controllers/user.controller";
import isAuth from "../middleware/auth.middleware";
const router = Router()

router.route('/register').post(userRegister)
router.route('/login').post(isAuth, userLogin)

export default router