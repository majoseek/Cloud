import express from "express";
const router = express.Router();
import authJWT from "../services/authentication.js";
import dirTree from "directory-tree";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

//get user's file list
router.get("/", authJWT, (req, res) => {
    if (req.user) {
        const tree = dirTree("./users_dirs/123/");
        res.send(tree);
    }
});

//upload file to user's folder
router.post("/upload", (req, res) => {
    const file_path = req.body.path;
    res.send("upload");
});

router.post("/folder", authJWT, (req, res) => {
    if (req.user) {
        const folder_path = req.body.path.substring(15);
        const folder_name = req.body.name;
        const dir =
            "./users_dirs/" +
            req.user.login +
            "/" +
            folder_path +
            "/" +
            folder_name;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        res.status(200).send("Folder created successfully");
    }
});

//download given file
router.post("/download", authJWT, (req, res) => {
    if (req.user) {
        const file_path = req.body.path;
        if (file_path) {
            if (file_path.length > req.user.login.length) {
                //check if user downloads his own files
                if (
                    file_path.substring(
                        "users_dirs/".length,
                        req.user.login.length + "users_dirs/".length
                    ) == req.user.login
                ) {
                    res.download(__dirname + "/" + file_path);
                } else res.send("Authentication error");
            } else res.send("Authentication error");
        } else res.send("No file specified");
    }
});
export default router;
