import db_connection from "../services/database.js";
import jwt from "jsonwebtoken";
const user_login = (login, password) => {
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
export default user_login;
