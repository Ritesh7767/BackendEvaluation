import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log("Database connection successfull at host :-", connectionInstance.connection.host)
        
    } catch (error) {
        console.log("Something went wrong while connection to db :- ", error)
        process.exit(1)
    }
}

export default connectDB