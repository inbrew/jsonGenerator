import React from "react";

// MUI css
import { Box, Button } from "@mui/material";

// component
import { postDataApiCall } from "../APIs/apicall";

// recoil
import { useRecoilValue } from "recoil";
import { nftMetaState } from "../recoil/nftMeta";

export default function MintButton() {
    const nftMetaData = useRecoilValue(nftMetaState);

    const handleMinting = async () => {
        console.log("잘 들어오니?", nftMetaData);
        await postDataApiCall("/nft/mint", nftMetaData);
    }

    return (
        <Box>
            <Button onClick={handleMinting} variant="contained">민팅하기</Button>
        </Box>
    );
}