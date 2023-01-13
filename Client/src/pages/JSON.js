import React from "react";

// MUI css
import { Box } from "@mui/material";

// component
import UploadFile from "../components/UploadFile";

export default function Json() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "3%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>이미지 파일을 올려서 NFT Json URL을 만드세요.</Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "10%" }}>
          <UploadFile />
        </Box>
      </Box>
    </Box>
  );
}
