import connectDB from "./connectDB/connectDB";
import app from "./app";
import dotenv from 'dotenv'

dotenv.config()

connectDB()
.then(() => app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running at port", process.env.PORT || 3000)
}))
.catch(() => console.log("something went wrong"))