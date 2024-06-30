import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

interface userSchemaInterface {
    username: string,
    email: string,
    password: string,
    refreshToken: string,
    blacklistToken: string[],
    isPasswordCorrect: (password: string)=>Promise<string>,
    generateAccessToken: ()=>string,
    generateRefreshToken: ()=>string

}

const userSchema = new mongoose.Schema<userSchemaInterface>(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        },
        blacklistToken: [
            {
                type: String
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
)

userSchema.pre('save', async function(next){

    if(!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 5)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password: string){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        `${process.env.ACCESS_SECRET}`,
        {
            expiresIn: process.env.ACCESS_SECRET
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        `${process.env.REFRESH_SECRET}`,
        {
            expiresIn: process.env.REFRESH_EXPIRY
        }
    )
}

const User = mongoose.model<userSchemaInterface>('User', userSchema)

export default User
