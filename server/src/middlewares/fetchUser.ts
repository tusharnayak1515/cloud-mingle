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
  const token = req.cookies.authorization || req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success,
      error: "Please authenticate using a valid token."
    });
  }
  try {
    const userToken = token.substring(7, token.length);
    // console.log("userToken: ", userToken);
    const data:any = jwt.verify(userToken, secret!);
    // console.log("data: ",data);

    // Checking if a user exists with the id received from the jwt
    let user:any = await User.findById(data.user.id);
    if(!user) {
        return res.status(404).json({ success, error: "User does not exist." });
    }

    req.body.user = data.user;
    next();
  } catch (error:any) {
    // console.log("error: ",error);
    success = false;
    return res.status(401).json({ success, error: error.message });
  }
};

export default fetchUser;