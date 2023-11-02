import { Request, Response } from "express";
import Starred from "../../models/Starred";
import { IStarred } from "../../entities/entityInterfaces";

const getStarred = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;

        let starredCollection: IStarred | null = await Starred.findOne({ user: userId })
            .populate({ path: "user", select: "-password" })
            .populate('collections')
            .populate({
                path: 'collections',
                populate: [
                    { path: 'owner', select: "-password" },
                    { path: 'members.member', select: "-password" },
                    { path: 'files.addedBy', select: "-password" }
                ]
            });

        if (!starredCollection) {
            starredCollection = await Starred.create({
                user: userId
            });

            starredCollection = await Starred.findById(starredCollection?._id?.toString())
                .populate({ path: "user", select: "-password" })
                .populate('collections')
                .populate({
                    path: 'collections',
                    populate: [
                        { path: 'owner', select: "-password" },
                        { path: 'members.member', select: "-password" },
                        { path: 'files.addedBy', select: "-password" }
                    ]
                });
        }

        success = true;
        return res.status(200).json({ success, starredCollection });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default getStarred;