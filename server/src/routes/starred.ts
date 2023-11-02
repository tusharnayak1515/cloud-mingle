import express from "express";
import fetchUser from "../middlewares/fetchUser";
import getStarred from "../controllers/starred/getStarred";
import starCollection from "../controllers/starred/starCollection";

const router = express.Router();

router.get("/",fetchUser,getStarred);
router.put("/:id",fetchUser,starCollection);

export default router;