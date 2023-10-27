import mongoose, { Document, Schema, Model } from "mongoose";
import { ICollection } from "../entities/entityInterfaces";

interface ICollectionDocument extends ICollection, Document {}

interface ICollectionModel extends Model<ICollectionDocument> {}

const CollectionSchema = new Schema<ICollectionDocument, ICollectionModel>({
    name: {
        type: String,
        required: true
    },
    files: [
        {
            data: Buffer,
            filename: String,
            contentType: String,
            addedBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    members: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            role: {
                type: String,
                default: null
            }
        }
    ],
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: true, versionKey: false });

const Collection = mongoose.model<ICollectionDocument, ICollectionModel>("Collection", CollectionSchema);

export default Collection;