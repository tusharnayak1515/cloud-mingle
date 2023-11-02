import mongoose, { Document, Schema, Model } from "mongoose";
import { IStarred } from "../entities/entityInterfaces";

interface IStarredDocument extends IStarred, Document { }

interface IStarredModel extends Model<IStarredDocument> { }

const StarredSchema = new Schema<IStarredDocument, IStarredModel>({
    collections: [
        {
            type: Schema.Types.ObjectId,
            ref: "Collection"
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: true, versionKey: false });

const Starred = mongoose.model<IStarredDocument, IStarredModel>("Starred", StarredSchema);

export default Starred;