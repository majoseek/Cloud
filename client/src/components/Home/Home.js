import { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
function Home(props) {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(["token"]);

    useEffect(() => {
        if (!cookies.token) history.push("/login");
        else console.log(cookies.token);
    }, [history, cookies]);
    return <h1>HOME</h1>;
}
export default withRouter(Home);
