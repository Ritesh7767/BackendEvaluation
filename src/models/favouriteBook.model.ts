import mongoose from "mongoose"

interface favouriteBookInterface {
    user: mongoose.Schema.Types.ObjectId,
    favouriteBooks: mongoose.Schema.Types.ObjectId[]
}

const favouriteBookSchema = new mongoose.Schema<favouriteBookInterface>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        favouriteBooks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            }
        ]
    }
)

const FavouriteBook = mongoose.model("FavouriteBook", favouriteBookSchema)

export default FavouriteBook