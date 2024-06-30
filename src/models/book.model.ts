import mongoose from "mongoose"

interface bookInterface {
    title: string,
    description: string,
    content: string,
    status?: boolean
    comments?: string[],
    author: mongoose.Schema.Types.ObjectId
}

const bookSchema = new mongoose.Schema<bookInterface>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false
        },
        comments: [
            {
                type: String
            }
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)

const Book = mongoose.model("Book", bookSchema)

export default Book