import express from "express";
import signup from "../controllers/auth/signup";
import signin from "../controllers/auth/signin";
import { body } from "express-validator";
import fetchUser from "../middlewares/fetchUser";
import getProfile from "../controllers/auth/getProfile";
import updateProfile from "../controllers/auth/updateprofile";
import changePassword from "../controllers/auth/changePassword";
import resetPassword from "../controllers/auth/resetPassword";
import passport from "passport";

const router = express.Router();

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "Successfully Logged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        error: "Log in failure",
    });
});

router.get("/google", passport.authenticate("google"));

router.get(
    "/google/callback", (req, res, next) => {
        passport.authenticate("google", (err: any, authInfo: any) => {
            if (err) {
                return res.redirect('/api/auth/login/failed');
            }

            const token = `Bearer ${authInfo?.token}`;
            const user = authInfo?.user;

            res.cookie("authorization", token, {
                maxAge: 60 * 60 * 24 * 1000,
                path: "/",
                httpOnly: process.env.NODE_ENV === "production" ? true : false,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                secure: process.env.NODE_ENV === "production" ? true : false
            });

            const FRONTEND_URL = process.env.NODE_ENV === "production" ? `https://expenso-jet.vercel.app?token=${token}` : process.env.CLIENT_URL;

            res.redirect(FRONTEND_URL!);
        })(req, res, next);
    });

router.post('/logout', function (req: any, res: any, next) {
    try {
        // req.logout(req.user, function (err: any) {
        //     if (err) { return next(err); }
        // });
        res.cookie("authorization", null, {
            maxAge: 0,
            path: "/",
            httpOnly: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV === "production" ? true : false,
        });

        const FRONTEND_URL = process.env.NODE_ENV === "production" ? "https://expenso-jet.vercel.app" : process.env.CLIENT_URL;
        res.redirect(FRONTEND_URL!);
    } catch (error) {
        console.log(error);
    }
});

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
    body("otp", "OTP cannot be empty").isLength({ min: 4, max: 4 })
], signup);

router.post("/signin", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
], signin);

router.get("/profile", fetchUser, getProfile);
router.put("/profile", fetchUser, updateProfile);
router.put("/change-password", fetchUser, changePassword);
router.put("/reset-password", resetPassword);

export default router;