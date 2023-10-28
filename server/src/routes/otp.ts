import express from "express";
import sendOtp from "../controllers/otp/sendOtp";
import { body } from "express-validator";

const router = express.Router();

router.post("/send", [
    body("email", "Email cannot be empty").isEmail()
], sendOtp);

export default router;