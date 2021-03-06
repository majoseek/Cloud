import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PublishIcon from "@material-ui/icons/Publish";
import FileHolder from "../FileHolder/FileHolder";
import AddIcon from "@material-ui/icons/Add";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
} from "@material-ui/core";
import FolderHolder from "../FolderHolder/FolderHolder";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    titles: {
        fontSize: "14px",
        fontWeight: "bold",
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [FolderTextField, setFolderTextField] = useState("");
    const [FolderDialogOpen, setFolderDialogOpen] = useState(false);
    const [FileDialogOpen, setFileDialogOpen] = useState(false);
    const [fileUpload, setFileUpload] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <ListItem button key={"Home"} onClick={props.home}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem button key={"Logout"} onClick={props.logout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={"Uploadfile"}>
                    <ListItemIcon onClick={() => setFileDialogOpen(true)}>
                        <PublishIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Upload file"}
                        onClick={() => setFileDialogOpen(true)}
                    />
                    <Dialog
                        open={FileDialogOpen}
                        onClose={() => setFileDialogOpen(false)}
                        aria-labelledby="form-dialog-title-file"
                    >
                        <DialogTitle id="form-dialog-title-file">
                            Upload file
                        </DialogTitle>
                        <DialogContent
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <DialogContentText>
                                We will upload below file to {props.folderName}{" "}
                                folder
                            </DialogContentText>
                            <Button variant="contained" component="label">
                                {fileUpload == null
                                    ? "Choose file"
                                    : fileUpload.name}
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                        setFileUpload(e.target.files[0])
                                    }
                                />
                            </Button>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setFileDialogOpen(false)}
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    setFileDialogOpen(false);
                                    props.uploadFile(fileUpload);
                                }}
                                color="primary"
                            >
                                Upload
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ListItem>
                <ListItem button key={"Createfolder"}>
                    <ListItemIcon onClick={() => setFolderDialogOpen(true)}>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Create folder"}
                        onClick={() => setFolderDialogOpen(true)}
                    />
                    <Dialog
                        open={FolderDialogOpen}
                        onClose={() => setFolderDialogOpen(false)}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            Create folder
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To create new folder, please provide its name.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                autoComplete="off"
                                id="foldername"
                                label="Enter folder name"
                                type="foldername"
                                value={FolderTextField}
                                onChange={(e) =>
                                    setFolderTextField(e.target.value)
                                }
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setFolderDialogOpen(false)}
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    props.createFolder(FolderTextField);
                                    setFolderDialogOpen(false);
                                }}
                                color="primary"
                                disabled={FolderTextField.length <= 0}
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ListItem>
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        DurrCloud
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid
                    container
                    spacing={4}
                    style={{
                        marginBottom: "20px",
                        marginTop: "40px",
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        style={{ marginBottom: "10px" }}
                    >
                        <Grid item xs={6}>
                            <h2>{props.folderName} folders</h2>
                        </Grid>
                    </Grid>
                    {props.currentFolder.filter(
                        (elem) => elem.type === "directory"
                    ).length > 0 ? (
                        props.currentFolder
                            .filter((elem) => elem.type === "directory")
                            .map((f) => {
                                return (
                                    <Grid item key={`${f.name}grid`}>
                                        <FolderHolder
                                            key={`${f.name}holder`}
                                            folder={f}
                                            setFolder={props.setCurrentFolder}
                                            setFolderName={props.setFolderName}
                                            setFolderPath={props.setFolderPath}
                                        />
                                    </Grid>
                                );
                            })
                    ) : (
                        <Typography className={classes.titles}>
                            You have not any folders here yet
                        </Typography>
                    )}
                </Grid>
                <Grid container direction="column">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        style={{
                            marginBottom: "10px",
                            marginTop: "50px",
                        }}
                    >
                        <Grid item xs={6}>
                            <h2>Your files</h2>
                        </Grid>
                    </Grid>

                    {props.currentFolder.filter((elem) => elem.type === "file")
                        .length > 0 ? (
                        props.currentFolder
                            .filter((elem) => elem.type === "file")
                            .map((f) => {
                                return (
                                    <FileHolder
                                        key={`${f.name}holder`}
                                        file={f}
                                    />
                                );
                            })
                    ) : (
                        <Typography className={classes.titles}>
                            You have not any files here yet
                        </Typography>
                    )}
                </Grid>
            </main>
        </div>
    );
}
export default ResponsiveDrawer;
