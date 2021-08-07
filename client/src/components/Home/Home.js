import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import React from "react";
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";

function Home() {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(["token"]);
    const [folder, setFolder] = useState([]);
    const [folderName, setFolderName] = useState("Home");

    useEffect(() => {
        if (!cookies.token) history.push("/login");
        else {
            axios
                .get("/file", {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                })
                .then((result) => {
                    setFolder(result.data["children"]);
                })
                .catch((err) => {
                    history.push("/login");
                });
        }
    }, [history, cookies]);
    return (
        <React.Fragment>
            <ResponsiveDrawer
                currentFolder={folder}
                setCurrentFolder={setFolder}
                folderName={folderName}
                setFolderName={setFolderName}
            />
        </React.Fragment>
    );
}
export default withRouter(Home);
