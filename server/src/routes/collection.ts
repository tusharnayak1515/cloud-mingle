import express from "express";
import fetchUser from "../middlewares/fetchUser";
import addCollection from "../controllers/collection/addCollection";
import { body } from "express-validator";
import addFiles from "../controllers/collection/addFiles";
import getAllCollections from "../controllers/collection/getAllCollections";
import getCollection from "../controllers/collection/getCollection";
import deleteCollection from "../controllers/collection/deleteCollection";
import renameCollection from "../controllers/collection/renameCollection";
import renameFile from "../controllers/collection/renameFile";
import deleteFile from "../controllers/collection/deleteFile";

const router = express.Router();

router.post("/", [
    body("name", "Collection name cannot be empty").isLength({ min: 1 })
], fetchUser, addCollection);

router.post("/add-files/:id", fetchUser, addFiles);

router.get("/", fetchUser, getAllCollections);
router.get("/:id", fetchUser, getCollection);
router.put("/:id", [
    body("name", "Name cannot be empty").isLength({ min: 1 })
], fetchUser, renameCollection);

router.put("/:id/rename-file", [
    body("filename", "Name cannot be empty").isLength({ min: 1 }),
    body("id", "File ID cannot be empty").exists()
], fetchUser, renameFile);

router.delete("/:id", fetchUser, deleteCollection);
router.delete("/:cid/files/:fid", fetchUser, deleteFile);

export default router;