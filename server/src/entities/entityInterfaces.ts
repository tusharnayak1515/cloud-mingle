import { Types } from "mongoose";

export interface IToken {
    [x: string]: any;
    email: string;
    otp: number;
    expiry?: number;
    createdAt?: Date;
}

export interface IUser {
    [x: string]: any;
    name: string;
    email: string;
    dp?: string;
    password: string;
    googleId?: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface ICollection {
    [x: string]: any;
    name: string;
    files: {
        data: Buffer;
        filename: string;
        contentType: string;
    }[];
    owner: Types.ObjectId | string;
    members: (Types.ObjectId | string)[];
    createdAt?: number;
    updatedAt?: number;
}


export interface IInvite {
    [x: string]: any;
    targetCollection: Types.ObjectId;
    user: Types.ObjectId;
    createdAt?: number;
    updatedAt?: number;
}