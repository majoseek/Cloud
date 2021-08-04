import db_connection from "../services/database.js";
import jwt from "jsonwebtoken";
export const user_login = (login, password) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE login="${login}" AND password="${password}"`;
        db_connection.query(query, (err, result) => {
            if (err) reject("Cant connect to database");
            if (result.length > 0) {
                const token = jwt.sign(
                    { login: result[0].login },
                    process.env.JWT_SECRET
                );
                resolve(token);
            } else reject("Incorrect login or password");
        });
    });
};
export const get_user = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) reject("Authentication error");
            resolve(user);
        });
    });
};
