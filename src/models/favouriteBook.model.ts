import mongoose from "mongoose"

interface favouriteBookInterface {
    user: mongoose.Schema.Types.ObjectId,
    favouriteBooks: string[]
}

const favouriteBookSchema = new mongoose.Schema<favouriteBookInterface>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        favouriteBooks: [
            {
                type: String,
            }
        ]
    }
)

const FavouriteBook = mongoose.model("FavouriteBook", favouriteBookSchema)

export default FavouriteBook