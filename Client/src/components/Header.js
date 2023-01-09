import React from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// Images
import headerMMG from "../img/Header_MMG.png";

export default function Header() {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: "1%" }}>
            <Box sx={{ display: 'flex' }}>
                <img
                    src={headerMMG}
                    width="auto"
                    height="80px"
                    alt="logo"
                />
                <Typography variant="h2">My Meta Gallery</Typography>
            </Box>
        </Box>
    );
}