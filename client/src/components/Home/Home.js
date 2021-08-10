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
                    history.go(0);
                });
        }
    }, [history, cookies]);
    const logout = () => {
        removeCookie("token");
        history.push("/login");
    };
    const navigate_home = () => {
        history.go(0);
    };
    const create_folder = (folder_name) => {
        axios
            .post(
                "/file/folder",
                { path: folderPath, name: folder_name },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            )
            .then(() => history.go(0))
            .catch((err) => console.log(err));
    };
    const upload_file = (file) => {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("filepath", folderPath);
        axios
            .post("/file/upload", fd, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            })
            .then(() => {
                history.go(0);
            })
            .catch((err) => {
                console.log(err);
            });
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
                uploadFile={upload_file}
            />
        </React.Fragment>
    );
}
export default withRouter(Home);
