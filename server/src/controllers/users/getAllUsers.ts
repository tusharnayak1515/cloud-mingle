import { Request, Response } from "express";
import { IUser } from "../../entities/entityInterfaces";
import User from "../../models/User";

const getAllUsers = async (req:Request, res:Response)=> {
    let success:boolean = false;
    try {
        const userId = req.body.user.id;

        const users:IUser[] = await User.find({_id: {$ne: userId}}).select("-password");

        success = true;
        return res.status(200).json({success, users});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default getAllUsers;