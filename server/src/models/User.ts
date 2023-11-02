import mongoose, { Document, Schema, Model } from "mongoose";
import { ICollection, IUser } from "../entities/entityInterfaces";
import Collection from "./Collection";
import Starred from "./Starred";

interface IUserDocument extends IUser, Document { }

interface IUserModel extends Model<IUserDocument> { }

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

UserSchema.pre('deleteOne', { document: true }, async function (next) {
    const user = this;

    try {
        await Collection.updateMany(
            { 'members.member': user._id },
            { $pull: { members: { member: user._id } } }
        );

        await Collection.deleteMany({ owner: user._id });

        await Collection.updateMany(
            { 'files.addedBy': user._id },
            { $pull: { files: { addedBy: user._id } } }
        );

        next();
    } catch (error: any) {
        next(error);
    }
});

UserSchema.post('save', async function (doc: IUserDocument) {
    const user = doc;

    try {
        const existingStarred = await Starred.findOne({ user: user._id });

        if (!existingStarred) {
            await Starred.create({ user: user._id });
        }
    } catch (error) {
        console.error("Error creating StarredCollection:", error);
    }
});


const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default User;