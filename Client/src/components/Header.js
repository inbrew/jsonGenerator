import React, { useEffect, useState } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// Images
import headerMMG from "../img/Header_MMG.png";

// api
import { getApiCall } from "../APIs/apicall";

export default function Header() {
    const [whichNet, setWhichNEt] = useState('네트워크에 연결이 되지 않았습니다.');

    const handleNetwork = async () => {
        // setWhichNEt()
        const result = await getApiCall("/address/network");

        let network = result.data.data;
        network.toLowerCase();

        if (network.indexOf('polygon') !== -1 && network[8] === 'p') {
            setWhichNEt('Polygon');
        } else if (network.indexOf('ethereum') !== -1 && network[8] === 'e') {
            setWhichNEt('Ethereum');
        } else if (network.indexOf('goerli') !== -1 && network[8] === 'g') {
            setWhichNEt('Ethereum');
        }
    }

    useEffect(() => {
        handleNetwork();
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: "1%" }}>
            <Box sx={{ display: 'flex' }}>
                <img
                    src={headerMMG}
                    width="auto"
                    height="80px"
                    alt="logo"
                />
                <Typography variant="h2">MMG {whichNet}</Typography>
            </Box>
        </Box>
    );
}