import express from "express";
import sendOtp from "../controllers/otp/sendOtp";

const router = express.Router();

router.post("/send", sendOtp);

export default router;