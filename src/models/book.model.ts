import mongoose from "mongoose"

interface bookInterface {
    title: string,
    content: string,
    description: string,
    comments?: string[],
    owner: mongoose.Schema.Types.ObjectId
}

const bookSchema = new mongoose.Schema<bookInterface>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        comments: [
            {
                type: String
            }
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Book = mongoose.model("Book", bookSchema)

export default Book