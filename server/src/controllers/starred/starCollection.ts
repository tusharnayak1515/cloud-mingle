import { Request, Response } from "express";
import { IStarred } from "../../entities/entityInterfaces";
import Starred from "../../models/Starred";
import Collection from "../../models/Collection";

const starCollection = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;
        const collectionId = req.params.id;

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success, error: "Collection does not exist" });
        }

        let starredCollection: IStarred | null = await Starred.findOne({ user: userId });

        if (!starredCollection) {
            starredCollection = await Starred.create({
                user: userId
            });
        }

        if (starredCollection?.collections?.some((item: any) => item?.toString() === collectionId)) {
            starredCollection = await Starred.findByIdAndUpdate(starredCollection?._id?.toString(),
                {
                    $pull: { collections: collectionId }
                },
                { new: true }
            );
        }
        else {
            starredCollection = await Starred.findByIdAndUpdate(starredCollection?._id?.toString(),
                {
                    $push: { collections: collectionId }
                },
                { new: true }
            );
        }

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

        success = true;
        return res.status(200).json({ success, starredCollection });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default starCollection;