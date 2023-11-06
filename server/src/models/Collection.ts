import mongoose, { Document, Schema, Model } from "mongoose";
import { ICollection } from "../entities/entityInterfaces";
import Invite from "./Invite";
import Starred from "./Starred";

interface ICollectionDocument extends ICollection, Document { }

interface ICollectionModel extends Model<ICollectionDocument> { }

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

CollectionSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    const collectionId = this.getFilter()._id;

    try {
        await Invite.deleteMany({ targetCollection: collectionId });
        await Starred.updateMany({ $pull: { collections: collectionId } });
        next();
    } catch (error: any) {
        next(error);
    }
});

const Collection = mongoose.model<ICollectionDocument, ICollectionModel>("Collection", CollectionSchema);

export default Collection;