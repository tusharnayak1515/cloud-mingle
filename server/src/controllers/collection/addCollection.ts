import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Collection from "../../models/Collection";
import { ICollection } from "../../entities/entityInterfaces";

const addCollection = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;
        const { name } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        await Collection.create({
            name,
            owner: userId
        });

        const collections: ICollection[] = await Collection.find({ $or: [{ owner: userId }, { members: { $in: userId } }] })
            .populate({ path: "owner", select: "-password" })
            .populate({
                path: "members",
                select: "-password",
            });


        success = true;
        return res.status(201).json({ success, collections });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default addCollection;