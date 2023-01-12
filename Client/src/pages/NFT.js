import React from "react";

// MUI css
import { Box } from "@mui/material";

// recoil
import { useRecoilValue } from "recoil";
import { readyState } from "../recoil/nftReady";

// component
import BeforeMint from "../components/BeforeMint";
import MintButton from "../components/MintButton";

export default function NFT() {
    const isReady = useRecoilValue(readyState);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "3%" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {isReady.isReady ? (
                    <>
                        <Box sx={{ mb: "10%" }}>
                            파일이 민팅할 준비가 되었습니다!
                        </Box>
                        <BeforeMint />
                        <Box sx={{ display: "flex", justifyContent: "center", mt: "10%" }}>
                            <MintButton />
                        </Box>

                    </>
                ) : (
                    <>
                        <Box sx={{ mb: "10%" }}>
                            아직 민팅할 준비가 되지 않았습니다!
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}
