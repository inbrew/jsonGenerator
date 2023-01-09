import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// recoil
import { useRecoilState } from "recoil";
import { tabSelectState } from "../recoil/tabSelect";

// MUI css
import { Box, Tabs, Tab } from "@mui/material";

export default function TabSelector() {
    const [tabValueState, setTabValue] = useRecoilState(tabSelectState);

    const handleTab = (event, newValue) => {
        setTabValue({ tabSelect: newValue });
        console.log(newValue);

        // 네비게이션 생성해야함.
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
                <Tab label="Dashboard" value="DASHBOARD" />
                <Tab label="NFT" value="NFT" />
                <Tab label="Json" value="Json" />
            </Tabs>
        </Box>
    );
}