import express from "express";
const router = express.Router();
import authJWT from "../services/authentication.js";
import dirTree from "directory-tree";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

const __dirname = path.resolve();

//get user's file list
router.get("/", authJWT, (req, res) => {
    if (req.user) {
        const tree = dirTree("./users_dirs/123/");
        res.send(tree);
    }
});

//upload file to user's folder
router.post("/upload", authJWT, (req, res) => {
    if (req.user) {
        if (req.body.filepath != undefined) {
            const uploadFile = req.files.file;
            const fileName = uploadFile.name;
            const filepath =
                req.body.filepath == ""
                    ? `users_dirs/${req.user.login}`
                    : req.body.filepath;
            if (!uploadFile) res.status(401).send("No file specified");
            uploadFile.mv(
                `${__dirname}/${filepath}/${fileName}`,
                function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    res.send("File added");
                }
            );
        }
    }
});

//create new folder at given location
router.post("/folder", authJWT, (req, res) => {
    if (req.user) {
        if (req.body.path != undefined) {
            const folder_path = req.body.path;
            const folder_name = req.body.name;
            const dir =
                "./" +
                (folder_path == ""
                    ? `users_dirs/${req.user.login}/`
                    : folder_path + "/") +
                folder_name;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            res.status(200).send("Folder created successfully");
        }
    }
});

//download given file
router.get("/download", (req, res) => {
    jwt.verify(req.query.t, process.env.JWT_SECRET, (err, user) => {
        if (req.query.path != undefined) {
            const file_path = req.query.path;
            if (file_path.length > user.login.length) {
                //check if user downloads his own files
                res.download(__dirname + "/" + file_path, (err) => {
                    if (err) console.log(err);
                });
            }
        }
    });
});

//delete given file
router.post("/delete", authJWT, (req, res) => {
    if (req.user) {
        if (req.body.path != undefined) {
            const file_path = req.body.path;
            console.log(file_path);
            if (fs.existsSync(file_path)) {
                fs.unlink(file_path, (err) => {
                    if (err) res.status(401).send("This file doesnt exist");
                    res.send("File deleted");
                });
            }
        }
    }
});

export default router;
