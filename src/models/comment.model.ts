import mongoose from "mongoose";

interface commentSchemaInterface {
    user: mongoose.Schema.Types.ObjectId,
    book: mongoose.Schema.Types.ObjectId,
    comment: string
}

const commentSchema = new mongoose.Schema<commentSchemaInterface>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        },
        comment: {
            type: String,
            required: true
        }
    }
)

const Comment = mongoose.model<commentSchemaInterface>('Comment', commentSchema)

export default Comment