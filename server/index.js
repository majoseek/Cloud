import express from "express";
import user_routes from "./routes/user.js";
import file_routes from "./routes/file.js";
import db_connection from "./services/database.js";
const app = express();
const PORT = 3001;
app.use(express.json());
app.use("/user", user_routes);
app.use("/file", file_routes);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
