import { Request, Response } from "express";
import { ICollection } from "../../entities/entityInterfaces";
import Collection from "../../models/Collection";

const getAllCollections = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId: string = req.body.user.id;

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

export default getAllCollections;