import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import authJWT from "../services/authentication.js";

//get user's file list
router.get("/", authJWT, (req, res) => {
    if (req.user) res.send("User authenticated");
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
