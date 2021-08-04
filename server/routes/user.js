import express from "express";
import * as controller from "../services/controller.js";
const router = express.Router();

//verify user login and password
router.post("/login", (req, res) => {
    controller
        .user_login(req.body.login, req.body.password)
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(403).send(err));
});

//get user nickname from his JWT token
router.post("/", (req, res) => {
    controller
        .get_user(req.body.token)
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(403).send(err));
});
export default router;
