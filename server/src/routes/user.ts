import express from "express";
import fetchUser from "../middlewares/fetchUser";
import getAllUsers from "../controllers/users/getAllUsers";

const router = express.Router();

router.get("/",fetchUser, getAllUsers);

export default router;