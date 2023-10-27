import { Request, Response } from "express";
import { ICollection } from "../../entities/entityInterfaces";
import Collection from "../../models/Collection";
import { validationResult } from "express-validator";

const renameFile = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;
        const collectionId = req.params.id;
        const { id, filename } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        let collection: ICollection | null = await Collection.findById(collectionId);

        if (!collection) {
            return res.status(404).json({ success, error: "Collection does not exist!" });
        }

        const file: any = collection?.files.find((file: any) => file?._id.toString() === id);
        if (!file) {
            return res.status(404).json({ success, error: "File does not exist!" });
        }

        let memberObj: any = collection?.members.find((obj: any) => obj?.member?.toString() === userId);

        if (collection?.owner.toString() !== userId && (!memberObj || memberObj?.role !== "full-access") || file?.addedBy?.toString() !== userId) {
            return res.status(401).json({ success, error: "You are not allowed to do this" });
        }

        const data: any = {
            filename,
            contentType: file?.contentType,
            data: file?.data,
            addedBy: file?.addedBy?.toString()
        };

        const files: any[] = collection?.files?.map((item: any) => item?._id.toString() === id ? data : item);

        collection = await Collection.findByIdAndUpdate(collectionId, { files: files }, { new: true });

        collection = await Collection.findById(collectionId)
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
        return res.status(200).json({ success, collection });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default renameFile;