import React from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box, Button } from "@mui/material";

// component
import { postDataApiCall } from "../APIs/apicall";

// recoil
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { nftMetaState } from "../recoil/nftMeta";
import { addressState } from "../recoil/addressForMint";
import { loadingState } from "../recoil/loading";
import { readyState } from "../recoil/nftReady";
import { tabSelectState } from "../recoil/tabSelect";

export default function MintButton() {
    const nftMetaData = useRecoilValue(nftMetaState);
    const address = useRecoilValue(addressState);
    const isLoading = useSetRecoilState(loadingState);

    const navigate = useNavigate();

    // state reset
    const resetNftMeta = useResetRecoilState(nftMetaState);
    const resetAddress = useResetRecoilState(addressState);
    const resetReady = useResetRecoilState(readyState);
    const resetTabSelect = useResetRecoilState(tabSelectState);

    const reset = () => {
        resetNftMeta();
        resetAddress();
        resetReady();
        resetTabSelect();
        window.location.replace('/');
    }

    const handleMinting = async () => {
        isLoading({ isLoading: true });

        const result = await postDataApiCall("/nft/mint", nftMetaData, address.address);

        if (result) {
            isLoading({ isLoading: false });
            reset();
        } else {
            isLoading({ isLoading: false });
            reset();
        }
    }

    return (
        <Box>
            <Button onClick={handleMinting} variant="contained">민팅하기</Button>
        </Box>
    );
}