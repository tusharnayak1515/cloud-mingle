import express from "express";
import fetchUser from "../middlewares/fetchUser";
import sendInvite from "../controllers/invite/sendInvite";
import acceptInvite from "../controllers/invite/acceptInvite";
import rejectInvite from "../controllers/invite/rejectInvite";
import getAllInvites from "../controllers/invite/getAllInvites";
import { body } from "express-validator";

const router = express.Router();

router.get("/", fetchUser, getAllInvites);

router.post("/:id", [
    body("membersObj", "Members list cannot be empty").isArray().exists()
] , fetchUser, sendInvite);

router.put("/accept/:id", fetchUser, acceptInvite);
router.put("/reject/:id", fetchUser, rejectInvite);

export default router;