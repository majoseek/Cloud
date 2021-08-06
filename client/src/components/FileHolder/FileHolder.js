import { Box, Button, Divider, Grid, Paper, Popper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import PhotoIcon from "@material-ui/icons/Photo";
import { useState } from "react";
import { Fade } from "@material-ui/core";
import "./FileHolder.css";
export default function FileHolder() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    return (
        <React.Fragment>
            <Grid container direction="row" className="FileHolder">
                <Grid item xs={1} style={{ marginLeft: "10px" }}>
                    <PhotoIcon />
                </Grid>
                <Grid item xs={4}>
                    Name
                </Grid>
                <Grid item xs={3}>
                    Modified
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
