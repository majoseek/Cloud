import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
function Home() {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(["token"]);
    const [user, setUser] = useState("");

    useEffect(() => {
        if (!cookies.token) history.push("/login");
        else {
            axios
                .post("/user", { token: cookies.token })
                .then((result) => {
                    setUser(result.data.login);
                })
                .catch((err) => {
                    console.log("Authentication error");
                    history.push("/login");
                });
        }
    }, [history, cookies]);
    return <h1>Welcome back {user}!</h1>;
}
export default withRouter(Home);
