import express from "express";
import user_login from "../services/controller.js";
const router = express.Router();

//verify user login and password
router.post("/login", (req, res) => {
    user_login(req.body.login, req.body.password)
        .then((response) => res.send(response))
        .catch((err) => res.send(err));
});
export default router;
