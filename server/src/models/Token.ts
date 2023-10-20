import mongoose, { Document, Schema, Model } from "mongoose";
import { IToken } from "../entities/entityInterfaces";

interface ITokenDocument extends IToken, Document {}

interface ITokenModel extends Model<ITokenDocument> {}

const TokenSchema = new Schema<ITokenDocument, ITokenModel>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    expiry: {
      type: Number,
    },
    createdAt: { type: Date, expires: "5m", default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

const Token = mongoose.model<ITokenDocument, ITokenModel>("Token", TokenSchema);

export default Token;