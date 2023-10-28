import mongoose, { Document, Schema, Model } from "mongoose";
import { IInvite } from "../entities/entityInterfaces";

interface IInviteDocument extends IInvite, Document {}

interface IInviteModel extends Model<IInviteDocument> {}

const InviteSchema = new Schema<IInviteDocument, IInviteModel>({
    targetCollection: {
        type: Schema.Types.ObjectId,
        ref: "Collection"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    role: {
        type: String,
        default: "read-only"
    },
    status: {
        type: String,
        default: "pending"
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: true, versionKey: false });

const Invite = mongoose.model<IInviteDocument, IInviteModel>("Invite", InviteSchema);

export default Invite;