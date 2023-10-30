import { Request, Response } from "express";
import { ICollection, IInvite, IUser } from "../../entities/entityInterfaces";
import Collection from "../../models/Collection";
import User from "../../models/User";
import Invite from "../../models/Invite";
import sendEmail from "../../services/email";
import { validationResult } from "express-validator";

const sendInvite = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;
        const collectionId = req.params.id;
        const { membersObj } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        let collection: ICollection | null = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success, error: "Collection does not exist" });
        }

        if (collection?.owner.toString() !== userId) {
            return res.status(401).json({ success, error: "You dont have the required access" });
        }

        for (let obj of collection?.members) {
            if (!membersObj.some((item: any) => item?.member === obj?.member?.toString())) {
                const data: any = {
                    member: obj?.member?.toString(),
                    role: obj?.role
                }
                collection = await Collection.findByIdAndUpdate(collectionId, { $pull: { members: data } }, { new: true });
            }
        }

        for (let obj of membersObj) {
            const memberId = obj.member;
            const memberRole = obj.role;
            console.log("memberRole: ", memberRole);
            const member: IUser | null = await User.findById(memberId);
            if (!member) {
                return res.status(404).json({ success, error: `User with ID='${memberId}' does not exist` });
            }

            if (memberId === collection?.owner.toString()) {
                return res.status(400).json({ success, error: "Collection owner cannot be a member" });
            }

            let invite: IInvite | null = await Invite.findOne({
                targetCollection: collectionId,
                user: memberId,
            });

            if (!invite) {
                invite = await Invite.create({
                    targetCollection: collectionId,
                    user: memberId,
                    role: memberRole,
                    status: "pending"
                });

                await sendEmail({
                    subject: "Invitation to join a collection",
                    text: `You have a new invitation to join a collection. Navigate to invites page to accept or reject it.`,
                    email: member?.email,
                });
            }

            if (invite?.status === "rejected" || invite?.status === "accepted") {
                let members = collection?.members?.map((item: any) => {
                    if (item?.member?.toString() === memberId) {
                        return { _id: item?._id.toString(), member: memberId, role: memberRole };
                    }
                    return item;
                });
                collection = await Collection.findByIdAndUpdate(collectionId, { members }, { new: true });
            }

        }

        const collections: ICollection[] = await Collection.find({
            $or: [{ owner: userId }, { "members.member": userId }],
        })
            .populate({ path: "owner", select: "-password" })
            .populate({
                path: "members.member",
                select: "-password",
            })
            .populate({
                path: "files.addedBy",
                select: "-password",
            });

        success = true;
        return res.status(200).json({ success, collections });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default sendInvite;