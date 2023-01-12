import React from "react";
import { useNavigate } from "react-router-dom";

// recoil
import { useRecoilState } from "recoil";
import { tabSelectState } from "../recoil/tabSelect";

// MUI css
import { Box, Tabs, Tab } from "@mui/material";

export default function TabSelector() {
    const [tabValueState, setTabValue] = useRecoilState(tabSelectState);
    const navigate = useNavigate();

    const handleTab = (event, newValue) => {
        setTabValue({ tabSelect: newValue });
        console.log(newValue);

        if (newValue === 'Main') {
            navigate('/');
        } else {
            navigate(`/${newValue}`);
        }
    }

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                onChange={handleTab}
                value={tabValueState.tabSelect}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab label="Main" value="Main" />
                <Tab label="Json" value="Json" />
                <Tab label="NFT" value="NFT" />
            </Tabs>
        </Box>
    );
}