import { Request, Response } from "express";
import { ICollection } from "../../entities/entityInterfaces";
import Collection from "../../models/Collection";

const getCollection = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId: string = req.body.user.id;
        const collectionId = req.params.id;

        let collection: ICollection | null = await Collection.findById(collectionId).exec();

        if (!collection) {
            return res.status(404).json({ success, error: "Collection not found" });
        }

        if (collection?.owner.toString() !== userId && !collection?.members.find((member: any) => member.toString() === userId)) {
            return res.status(401).json({ success, error: "You dont have the required access" });
        }

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

export default getCollection;