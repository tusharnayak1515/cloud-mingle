import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import User from "../models/User";
const secret = process.env.JWT_SECRET;

const fetchUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  let success = false;
  const token = req.headers.authorization || req.cookies.authorization;
  if (!token) {
    return res.status(401).json({
      success,
      error: "Please authenticate using a valid token."
    });
  }
  try {
    const userToken = token.substring(7, token.length);
    const data:any = jwt.verify(userToken, secret!);

    let user:any = await User.findById(data.user.id);
    if(!user) {
      return res.status(404).json({ success, error: "User does not exist." });
    }

    req.body.user = data.user;
    next();
  } catch (error:any) {
    success = false;
    return res.status(401).json({ success, error: error.message });
  }
};

export default fetchUser;