import React from "react";
import { Box, Button, Divider } from "@material-ui/core";
import "./FolderHolder.css";
export default function FolderHolder() {
    return (
        <React.Fragment>
            <Button
                style={{
                    borderRadius: "10%",
                }}
            >
                <Box
                    p={2}
                    paddingLeft={3}
                    paddingRight={3}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    className="BoxContainer"
                    fontWeight="fontWeightBold"
                >
                    <img
                        src={process.env.PUBLIC_URL + "/open_folder.svg"}
                        alt="openfolder"
                        className="Media"
                    />
                    <Divider />
                    <label>Podfolder</label>
                </Box>
            </Button>
        </React.Fragment>
    );
}
