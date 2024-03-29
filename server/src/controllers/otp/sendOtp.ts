import { Request, Response } from "express";
import Token from "../../models/Token";
import sendEmail from "../../services/email";
import { validationResult } from "express-validator";

const sendOtp = async (req:Request, res:Response) => {
  let success:boolean = false;
  try {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }
    
    const otp = Math.floor(1000 + Math.random() * 9000);
    let token = await Token.findOne({ email });

    if (!token) {
      // Creating the token
      token = await Token.create({
        email,
        otp,
      });
    } else {
      token = await Token.findByIdAndUpdate(
        token._id.toString(),
        { otp },
        { new: true }
      );
    }

    // Sending OTP, to the user's email
    await sendEmail({
      subject: "OTP verification! This OTP is valid for 5 minutes only!",
      text: `OTP: ${token?.otp}`,
      email: email,
    });

    success = true;
    return res.status(200).json({ success });
  } catch (error:any) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
};

export default sendOtp;