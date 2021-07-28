import axios from "axios";
import { useState } from "react";
function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const send_data = (e) => {
        axios
            .post("/user/login", { login: login, password: password })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log("Wrong login/password");
            });
        e.preventDefault();
    };
    return (
        <form onSubmit={(e) => send_data(e)}>
            <input
                type="text"
                placeholder="Enter login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">SUBMIT</button>
        </form>
    );
}
export default Login;
