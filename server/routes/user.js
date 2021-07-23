import express from "express";
const user_route = express.Router();

//verify user login and password
user_route.post("/login", (req, res) => {
    res.send("login");
});

//register new user
user_route.post("/register", (req, res) => {
    res.send("register");
});
export default user_route;
