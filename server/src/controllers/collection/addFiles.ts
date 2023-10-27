import { Request, Response } from "express";
import { Files, Fields, IncomingForm } from "formidable";
import fs from "fs";
import Collection from "../../models/Collection";
import { ICollection } from "../../entities/entityInterfaces";

const addFiles = async (req: Request, res: Response) => {
    let success: boolean = false;
    try {
        const userId = req.body.user.id;
        const collectionId = req.params.id;
        let collection: ICollection | null = await Collection.findById(collectionId);

        if (!collection) {
            return res.status(404).json({ success, error: "Collection not found" });
        }

        let memberObj: any = collection.members.find((obj: any) => obj?.member?.toString() === userId);

        console.log("memberObj: ", memberObj);

        if (collection.owner.toString() !== userId && (!memberObj || ["write-only", "full-access"].indexOf(memberObj?.role) === -1)) {
            return res.status(401).json({ success, error: "You dont have the required access" });
        }

        let formData = new IncomingForm();
        formData.parse(req, async function (error, fields: Fields, files: Files) {
            console.log("files: ", files);
            if (error) {
                console.log("Error parsing form:", error);
                return res.status(500).json({ success, error: "Error parsing form" });
            }
            if (Object.keys(files).length === 0) {
                return res
                    .status(422)
                    .json({ success, error: "Add files body cannot be empty!" });
            }

            for (const key of Object.keys(files)) {
                const val: any = files[key];
                const file: any = val[0];
                console.log("file: ", file);
                console.log("check 1: ", file._writeStream);
                console.log("check 2: ", file._writeStream.data);

                if (!file._writeStream || !file._writeStream.path) {
                    return res.status(400).json({ success, error: "File data is missing or invalid." });
                }

                const fileData = fs.readFileSync(file?._writeStream?.path);

                const newFile = {
                    filename: file.originalFilename,
                    data: fileData,
                    contentType: file.mimetype,
                    addedBy: userId
                };

                console.log("new File: ", newFile);

                collection = await Collection.findByIdAndUpdate(collectionId, { $push: { files: newFile } }, { new: true });

                collection = await Collection.findById(collectionId)
                    .populate({ path: "owner", select: "-password" })
                    .populate({
                        path: "members.member",
                        select: "-password",
                    });
            }

            success = true;
            return res.status(200).json({ success, collection });
        });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default addFiles;