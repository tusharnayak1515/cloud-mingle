import express from "express";
import signup from "../controllers/auth/signup";
import signin from "../controllers/auth/signin";
import { body } from "express-validator";
import fetchUser from "../middlewares/fetchUser";
import getProfile from "../controllers/auth/getProfile";

const router = express.Router();

router.post("/signup", [
    body("name", "Name cannot be empty").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be minimum 8 characters long, including uppercase, lowercase, numbers and special characters")
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("otp", "OTP cannot be empty").isLength({min: 4, max: 4})
], signup);

router.post("/signin", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
], signin);

router.get("/profile", fetchUser, getProfile);

export default router;