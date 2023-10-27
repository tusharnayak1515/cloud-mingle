import { Request, Response } from "express";
import Collection from "../../models/Collection";
import { ICollection } from "../../entities/entityInterfaces";

const deleteFile = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;
        const collectionId = req.params.cid;
        const fileId = req.params.fid;

        let collection: ICollection | null = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success, error: "Collection does not exist" });
        }

        if (collection?.owner?.toString() !== userId && !collection.members.find((member: any) => member.toString() === userId)) {
            return res.status(401).json({ success, errror: "You are not allowed to do this" })
        }

        let file: any = collection?.files?.find((file: any) => file?._id.toString() === fileId);
        if (!file) {
            return res.status(404).json({ success, error: "File does not exist" });
        }

        collection = await Collection.findByIdAndUpdate(
            collectionId,
            { $pull: { files: { _id: file._id } } },
            { new: true }
        );

        collection = await Collection.findById(collectionId)
            .populate({ path: "owner", select: "-password" })
            .populate({
                path: "members",
                select: "-password",
            });

        success = true;
        return res.status(200).json({ success, collection });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default deleteFile;