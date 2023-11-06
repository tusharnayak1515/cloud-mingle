import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { IToken, IUser } from "../../entities/entityInterfaces";
import Token from "../../models/Token";

const resetPassword = async (req: Request, res: Response)=> {
    let success = false;
    try {
        const {email, newPassword, confirmPassword, otp} = req.body;

        let user: IUser | null = await User.findOne({email}).exec();

        const userId:string = user?._id.toString();

        if(newPassword !== confirmPassword) {
            return res.status(401).json({success, error: "Password mismatch"});
        }

        let token: IToken | null = await Token.findOne({ email }).exec();
        if (!token) {
        return res.status(404).json({ success, error: "Invalid Token." });
        }

        if (token.otp !== parseInt(otp)) {
        return res.status(403).json({ success, error: "Incorrect otp." });
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(newPassword, salt);

        user = await User.findByIdAndUpdate(userId, {password: securedPassword}, {new: true}).select("-password -createdAt -updatedAt").exec();
        
        token = await Token.findOneAndDelete(token?._id?.toString(), { new: true }).exec();

        success = true;
        return res.status(200).json({success});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default resetPassword;