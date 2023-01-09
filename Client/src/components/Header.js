import React from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box, Typography } from "@mui/material";

// Images
import headerMMG from "../img/Header_MMG.png";

export default function Header() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: "1%" }}>
            <Box onClick={() => handleClick()} sx={{ display: 'flex', cursor: "pointer" }}>
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