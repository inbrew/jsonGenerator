import React from "react";

// MUI css
import { Box, Button } from "@mui/material";

// component
import { getApiCall } from "../APIs/apicall";

export default function MintButton() {
    const handleMinting = () => {
        console.log("잘 들어오니?");
        getApiCall("/nft/mint");
    }

    return (
        <Box>
            <Button onClick={handleMinting} variant="contained">민팅하기</Button>
        </Box>
    );
}