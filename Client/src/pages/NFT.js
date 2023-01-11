import React, { useState } from "react";

// MUI css
import { Box } from "@mui/material";

// recoil
import { useRecoilValue } from "recoil";
import { fileNumState } from "../recoil/files";

// component
import BeforeMint from "../components/BeforeMint";

export default function NFT() {
  const fileNum = useRecoilValue(fileNumState);
  const [isReady, setIsReady] = useState(true);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "3%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {isReady ? (
          <>
            <Box sx={{ mb: "10%" }}>
              {fileNum.count}개의 파일이 민팅할 준비가 되었습니다!
            </Box>
            <BeforeMint />
            <Box sx={{ display: "flex", justifyContent: "center", mt: "10%" }}>
              dfdfdfdf
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
