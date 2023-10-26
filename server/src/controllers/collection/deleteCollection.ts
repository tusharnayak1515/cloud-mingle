import { Request, Response } from "express";
import { ICollection } from "../../entities/entityInterfaces";
import Collection from "../../models/Collection";

const deleteCollection = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;
        const collectionId = req.params.id;

        const collection: ICollection | null = await Collection.findById(collectionId);

        if (!collection) {
            return res.status(404).json({ success, error: "Collection does not exist!" });
        }

        if (collection?.owner.toString() !== userId) {
            return res.status(401).json({ success, error: "You are not allowed to do this" });
        }

        await Collection.findByIdAndDelete(collectionId, { new: true });

        const collections: ICollection[] = await Collection.find({ $or: [{ owner: userId }, { members: { $in: userId } }] })
            .populate({ path: "owner", select: "-password" })
            .populate({
                path: "members",
                select: "-password",
            });

        success = true;
        return res.status(200).json({ success, collections });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default deleteCollection;