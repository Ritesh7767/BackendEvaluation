import express, {Request, Response, NextFunction} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors())
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({limit: '16kb'}))
app.use(cookieParser())

import userRouter from './routers/user.router'
app.use('api/v1/user', userRouter)

import bookRouter from './routers/book.router'
app.use('api/v1/book', bookRouter)

import commentRouter from './routers/comment.router'
app.use('api/v1/comment', commentRouter)

import favouriteRouter from './routers/favouriteBook.router'
import ApiError from './utils/apiError'
app.use('/api/v1/favouriteBook', favouriteRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ApiError){
        res.status(err.statusCode).json({
            success: false, 
            message: err.message,
            data: err.data,
            error: err.error
        })
    }
    else {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: []
        })
    }
})

export default app
