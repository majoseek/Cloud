import { Divider, Grid } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import PhotoIcon from "@material-ui/icons/Photo";
export default function FileHolder() {
    return (
        <React.Fragment>
            <Grid container direction="row" style={{ paddingTop: "35px" }}>
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
                    <MoreVertIcon />
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={9}>
                    <Divider />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
