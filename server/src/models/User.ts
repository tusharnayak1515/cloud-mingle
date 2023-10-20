import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "../entities/entityInterfaces";

interface IUserDocument extends IUser, Document {}

interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema<IUserDocument, IUserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dp: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        default: null
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: true, versionKey: false });

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default User;