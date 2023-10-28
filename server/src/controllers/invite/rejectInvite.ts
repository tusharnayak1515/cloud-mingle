import { Request, Response } from "express";
import { ICollection, IInvite } from "../../entities/entityInterfaces";
import Collection from "../../models/Collection";
import Invite from "../../models/Invite";

const rejectInvite = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;
        const inviteId = req.params.id;

        let invite: IInvite | null = await Invite.findById(inviteId);
        if (!invite) {
            return res.status(400).json({ success, error: "Invalid invite" });
        }

        if(invite?.user?.toString() !== userId) {
            return res.status(401).json({success, error: "You are not allowed to do this"});
        }

        let collection: ICollection | null = await Collection.findById(invite?.targetCollection?.toString());
        if (!collection) {
            return res.status(404).json({ success, error: "Collection does not exist" });
        }

        if(invite?.status !== "pending") {
            return res.status(401).json({success, error: "You are not allowed to do this"});
        }

        invite = await Invite.findByIdAndUpdate(inviteId, { status: "rejected" }, { new: true });

        const data: any = {
            member: userId,
            role: invite?.role
        }

        collection = await Collection.findByIdAndUpdate(collection?._id?.toString(), { $pull: { members: data } }, { new: true });

        const invites: IInvite[] = await Invite.find({ user: userId })
            .populate({ path: "targetCollection" })
            .populate({ path: "user", select: "-password" });

        success = true;
        return res.status(200).json({ success, invites });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default rejectInvite;