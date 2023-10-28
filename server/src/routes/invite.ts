import express from "express";
import fetchUser from "../middlewares/fetchUser";
import sendInvite from "../controllers/invite/sendInvite";
import acceptInvite from "../controllers/invite/acceptInvite";
import rejectInvite from "../controllers/invite/rejectInvite";
import getAllInvites from "../controllers/invite/getAllInvites";

const router = express.Router();

router.get("/", fetchUser, getAllInvites);
router.post("/:id", fetchUser, sendInvite);
router.put("/accept/:id", fetchUser, acceptInvite);
router.put("/reject/:id", fetchUser, rejectInvite);

export default router;