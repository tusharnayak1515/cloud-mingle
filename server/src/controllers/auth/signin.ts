import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { IUser } from "../../entities/entityInterfaces";

const secret = process.env.JWT_SECRET;

const signin = async (req: Request, res: Response) => {
  let success:boolean = false;
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }

    let user: IUser | null = await User.findOne({ email }).exec();
    if (!user) {
      return res
        .status(404)
        .json({
          success,
          error: "User not found",
        });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ success, error: "Incorrect credentials." });
    }

    user = await User.findById(user._id.toString()).select("-password -createdAt -updatedAt").exec();

    const data: any = {
      user: {
        id: user?.id
      },
    };

    const jwtToken = jwt.sign(data, secret!);

    success = true;
    return res.status(200).json({ success, user, token: `Bearer ${jwtToken}` });
  } catch (error: any) {
    return res.status(500).json({ success, error: error.message });
  }
};

export default signin;