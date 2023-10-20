import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { IToken, IUser } from "../../entities/entityInterfaces";
import Token from "../../models/Token";
import User from "../../models/User";

const signup = async (req: Request, res: Response) => {
    let success = false;
    try {
        const { name, email, password, otp } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        let token: IToken | null = await Token.findOne({ email }).exec();
        if (!token) {
            return res.status(404).json({ success, error: "Invalid Token." });
        }

        if (token.otp !== parseInt(otp)) {
            return res.status(403).json({ success, error: "Incorrect otp." });
        }

        let user: IUser | null = await User.findOne({ email }).exec();
        if (user) {
            return res
                .status(403)
                .json({
                    success,
                    error: "This email is associated to another account.",
                });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        token = await Token.findOneAndDelete(token?._id?.toString(), { new: true }).exec();

        success = true;
        return res.status(200).json({ success });

    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default signup;