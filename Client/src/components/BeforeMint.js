import React from "react";

// MUI css
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

// recoil
import { useRecoilValue } from "recoil";
import { fileNumState } from "../recoil/files";

export default function BeforeMint() {
  const fileNum = useRecoilValue(fileNumState);

  const rendering = () => {
    const result = [];

    for (let i = 0; i < fileNum.count; i++) {
      result.push(
        <Box key={i} sx={{ mb: "5%" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                파일 이름
              </Typography>
              <Typography variant="h5" component="div">
                이건 뭥미?
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      );
    }

    return result;
  };

  return <Box>{rendering()}</Box>;
}
