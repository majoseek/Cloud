import express from "express";
const router = express.Router();
import authJWT from "../services/authentication.js";
import dirTree from "directory-tree";

//get user's file list
router.get("/", authJWT, (req, res) => {
    if (req.user) {
        const tree = dirTree("./users_dirs/123/");
        res.send(tree);
    }
});

//upload file to user's folder
router.post("/upload", (req, res) => {
    res.send("upload");
});

//download given file
router.get("/download", (req, res) => {
    res.send("download");
});
export default router;
