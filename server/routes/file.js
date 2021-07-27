import express from "express";
const router = express.Router();

//get user's file list
router.get("/files", (req, res) => {
    res.send("files");
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
