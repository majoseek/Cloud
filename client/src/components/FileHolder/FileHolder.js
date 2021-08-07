import { Box, Button, Divider, Grid, Paper, Popper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useEffect } from "react";
import { useState } from "react";
import { Fade } from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import path from "path";
import "./FileHolder.css";
import getFileExtension from "./service.js";
export default function FileHolder(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const [file_extension, setFileExtension] = useState(
        <InsertDriveFileIcon />
    );
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
                                        <Button>Download</Button>
                                        <Button>Delete</Button>
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
