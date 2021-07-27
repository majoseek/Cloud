import express from "express";
const router = express.Router();
import db_connection from "../services/database.js";

//verify user login and password
router.post("/login", (req, res) => {
    new Promise((resolve, reject) => {
        db_connection.query(
            `SELECT * FROM users WHERE login=${req.body.login} AND password=${req.body.password}`,
            (err, result, fields) => {
                if (err) throw err;
                resolve(result);
            }
        );
    }).then((result) => {
        if (result.length > 0) res.send("Logged in");
        else res.send("Incorrect login or password");
        //TODO: Add JWT Token to auth process
    });
});

//register new user
router.post("/register", (req, res) => {
    res.send("register");
});
export default router;
