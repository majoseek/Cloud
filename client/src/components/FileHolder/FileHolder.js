import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
export default function FileHolder() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
        >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <Grid item xs={1}>
                    <Paper>FOTO</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>NAZWA</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper>MODIFIED</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper>PRZYCISK</Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
