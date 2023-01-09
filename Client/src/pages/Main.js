import React from "react";

// MUI css
import { Box, Button } from "@mui/material";

// recoil
import { useRecoilState } from "recoil";
import { loadingState } from "../recoil/loading";

export default function Main() {
    const [loading, setLoading] = useRecoilState(loadingState);

    const handleLoading = () => {
        if (loading.isLoading) {
            setLoading({ isLoading: false });
        } else {
            setLoading({ isLoading: true });
        }
    }

    return (
        <Box sx={{ border: 1 }}>
            <Box>여긴 아마 현재 NFT 보유량이나 여러가지 정보가 먼저 나와야 될듯?</Box>
            <Button onClick={handleLoading} variant="contained">로딩</Button>
        </Box>
    );
}