import { Request, Response } from "express";
import { IInvite } from "../../entities/entityInterfaces";
import Invite from "../../models/Invite";

const getAllInvites = async (req:Request, res: Response)=> {
    let success:boolean = false;
    try {
        const userId = req.body.user.id;
        const invites: IInvite[] = await Invite.find({ user: userId })
            .populate({ path: "targetCollection" })
            .populate({ path: "user", select: "-password" });

        success = true;
        return res.status(200).json({ success, invites });
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default getAllInvites;