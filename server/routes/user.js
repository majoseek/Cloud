import express from "express";
const router = express.Router();

//verify user login and password
router.post("/login", (req, res) => {
    res.send("login");
});

//register new user
router.post("/register", (req, res) => {
    res.send("register");
});
export default router;
