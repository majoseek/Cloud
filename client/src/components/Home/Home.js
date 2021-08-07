import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import React from "react";
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";

function Home() {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [folder, setFolder] = useState([]);
    const [folderName, setFolderName] = useState("Home");
    const [folderPath, setFolderPath] = useState("");

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
    const logout = () => {
        removeCookie("token");
        history.push("/login");
    };
    const navigate_home = () => {
        history.push("/login");
    };
    const create_folder = () => {
        //axios.post("/file/folder",{path:folderPath})
    };
    return (
        <React.Fragment>
            <ResponsiveDrawer
                currentFolder={folder}
                setCurrentFolder={setFolder}
                folderName={folderName}
                setFolderName={setFolderName}
                logout={logout}
                home={navigate_home}
                createFolder={create_folder}
                setFolderPath={setFolderPath}
            />
        </React.Fragment>
    );
}
export default withRouter(Home);
