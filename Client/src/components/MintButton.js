import React from "react";

// MUI css
import { Box, Button } from "@mui/material";

// component
import { postDataApiCall } from "../APIs/apicall";

// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nftMetaState } from "../recoil/nftMeta";
import { addressState } from "../recoil/addressForMint";
import { loadingState } from "../recoil/loading";

export default function MintButton() {
    const nftMetaData = useRecoilValue(nftMetaState);
    const address = useRecoilValue(addressState);
    const isLoading = useSetRecoilState(loadingState);

    const handleMinting = async () => {
        isLoading({ isLoading: true });

        const result = await postDataApiCall("/nft/mint", nftMetaData, address.address);

        if (result) {
            isLoading({ isLoading: false });
        } else {
            isLoading({ isLoading: false });
        }
    }

    return (
        <Box>
            <Button onClick={handleMinting} variant="contained">민팅하기</Button>
        </Box>
    );
}