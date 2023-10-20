import express from "express";
import fetchUser from "../middlewares/fetchUser";
import addCollection from "../controllers/collection/addCollection";
import { body } from "express-validator";
import addFiles from "../controllers/collection/addFiles";
import getAllCollections from "../controllers/collection/getAllCollections";

const router = express.Router();

router.post("/", [
    body("name","Collection name cannot be empty").isLength({min: 1})
], fetchUser, addCollection);

router.post("/add-files/:id", fetchUser, addFiles);

router.get("/", fetchUser, getAllCollections);

export default router;