import { Request, Response } from "express";
import { IUser } from "../../entities/entityInterfaces";
import User from "../../models/User";

const updateProfile = async (req: Request, res: Response) => {
    let success = false;
    try {
        const userId = req.body.user.id;
        let user:IUser | any = await User.findById(userId).exec();
        const {name,email,dp} = req.body;
        let image: string | any = dp;

        if (!image) {
            image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
        }

        user = await User.findByIdAndUpdate(userId, { name, email, dp: image }, { new: true }).exec();

        success = true;
        return res.status(200).json({ success, user });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default updateProfile;