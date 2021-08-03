import { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
function Home(props) {
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("token")) history.push("/login");
    }, [history]);
    return <h1>HOME</h1>;
}
export default withRouter(Home);
