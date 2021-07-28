import jwt from "jsonwebtoken";

//function to authenticate JWT token sent by user
const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(403).send("User not authenticated");
            req.user = user;
            next();
        });
    } else res.status(401).send("No auth header provided");
};
export default authJWT;
