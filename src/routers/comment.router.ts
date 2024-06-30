import {Router} from 'express'
import isAuth from '../middleware/auth.middleware'
import { commentOnBooks, deleteComment, updateComment } from '../controllers/comment.controllers'
const router = Router()

router.route('/comment').post(isAuth, commentOnBooks)
router.route('/updateComment').post(isAuth, updateComment)
router.route('/deleteComment').post(isAuth, deleteComment)

export default router