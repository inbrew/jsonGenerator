import React, { useEffect, useState } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// Images
import headerMMG from "../img/Header_MMG.png";

// api
import { getApiCall } from "../APIs/apicall";

// recoil
import { useResetRecoilState } from "recoil";
import { nftMetaState } from "../recoil/nftMeta";
import { addressState } from "../recoil/addressForMint";
import { loadingState } from "../recoil/loading";
import { readyState } from "../recoil/nftReady";
import { tabSelectState } from "../recoil/tabSelect";

export default function Header() {
  // state reset
  const resetNftMeta = useResetRecoilState(nftMetaState);
  const resetAddress = useResetRecoilState(addressState);
  const resetReady = useResetRecoilState(readyState);
  const resetTabSelect = useResetRecoilState(tabSelectState);
  const resetLoading = useResetRecoilState(loadingState);

  const reset = () => {
    resetNftMeta();
    resetAddress();
    resetReady();
    resetTabSelect();
    resetLoading();
    window.location.replace("/");
  };

  const [whichNet, setWhichNEt] = useState(
    "네트워크에 연결이 되지 않았습니다."
  );

  const handleNetwork = async () => {
    // setWhichNEt()
    const result = await getApiCall("/address/network");

    let network = result.data.data;
    network.toLowerCase();

    if (network.indexOf("polygon") !== -1 && network[8] === "p") {
      setWhichNEt("Polygon");
    } else if (network.indexOf("ethereum") !== -1 && network[8] === "e") {
      setWhichNEt("Ethereum");
    } else if (network.indexOf("goerli") !== -1 && network[8] === "g") {
      setWhichNEt("Ethereum");
    }
  };

  useEffect(() => {
    handleNetwork();
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: "1%" }}>
      <Box onClick={reset} sx={{ display: "flex", cursor: "pointer" }}>
        <img src={headerMMG} width="auto" height="80px" alt="logo" />
        <Typography variant="h2">MMG {whichNet}</Typography>
      </Box>
    </Box>
  );
}
