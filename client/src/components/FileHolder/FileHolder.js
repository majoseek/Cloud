import { Box, Button, Divider, Grid, Paper, Popper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useEffect } from "react";
import { useState } from "react";
import { Fade } from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import path from "path";
import "./FileHolder.css";
import getFileExtension from "./service.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
export default function FileHolder(props) {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(["token"]);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const [file_extension, setFileExtension] = useState(
        <InsertDriveFileIcon />
    );
    const download_file = () => {
        window.open(
            `http://localhost:3001/file/download?path=${props.file.path}&t=${cookies.token}`
        );
    };
    const delete_file = () => {
        axios
            .post(
                "/file/delete",
                { path: props.file.path },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            )
            .then(() => history.go(0));
    };
    useEffect(() => {
        const file_ext = path.extname(props.file.name);
        setFileExtension(getFileExtension(file_ext));
    }, [props]);
    return (
        <React.Fragment>
            <Grid container direction="row" className="FileHolder">
                <Grid item xs={1} style={{ marginLeft: "10px" }}>
                    {file_extension}
                </Grid>
                <Grid item xs={4}>
                    {props.file.name}
                </Grid>
                <Grid item xs={1}>
                    <Button onClick={handleClick} aria-describedby={"popper"}>
                        <MoreVertIcon />
                    </Button>
                    <Popper
                        id={"popper"}
                        open={open}
                        anchorEl={anchorEl}
                        transition
                        placement={"top"}
                    >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={300}>
                                <Paper>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="stretch"
                                        flexDirection="column"
                                    >
                                        <Button onClick={() => download_file()}>
                                            Download
                                        </Button>
                                        <Button onClick={() => delete_file()}>
                                            Delete
                                        </Button>
                                    </Box>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
