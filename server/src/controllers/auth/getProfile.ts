import { Request, Response } from "express";
import { IUser } from "../../entities/entityInterfaces";
import User from "../../models/User";

const getProfile = async (req: Request, res: Response)=> {
    let success:boolean = false;
    try {
        const userId:string = req.body.user.id;

        const user: any = await User.findById(userId).select("-password");

        success = true;
        return res.status(200).json({success, user});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default getProfile;