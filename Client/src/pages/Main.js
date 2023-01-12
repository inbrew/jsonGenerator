import React, { useState } from "react";

// MUI css
import { Box, TextField, Button } from "@mui/material";

// recoil
import { useRecoilState } from "recoil";
import { loadingState } from "../recoil/loading";

// api
import { postApiCall } from "../APIs/apicall";

export default function Main() {
    const [loading, setLoading] = useRecoilState(loadingState);
    const [isErr, setIsErr] = useState(false);
    const [address, setAddress] = useState('');

    const handleCheckAddress = async () => {
        setLoading({ isLoading: true });

        const result = await postApiCall("/address/check", address);

        if (result.data.data) {
            // 데이터가 잘 들어옴
            setIsErr(false);
            setLoading({ isLoading: false });
        } else {
            // 데이터가 잘 들어오지 않음.
            setIsErr(true);
            setLoading({ isLoading: false });
        }

    }

    const handleInput = (inputAddress) => {
        setAddress(inputAddress.target.value);
    }

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '3%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: '5%' }}>
                <Box sx={{ width: '70%' }}>
                    {!isErr
                        ?
                        <TextField autoFocus margin="dense" id="addressInput" label="address" variant="standard" fullWidth onChange={handleInput} />
                        :
                        <TextField
                            error
                            id="standard-error-helper-text"
                            label="받을 주소가 올바르지 않습니다."
                            fullWidth
                            helperText="유효한 주소인지 확인해주세요."
                            variant="standard"
                            onChange={handleInput}
                        />
                    }
                </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ width: '40%', mt: "5%" }} onClick={handleCheckAddress} variant="contained">시작하기</Button>
            </Box>
        </Box >
    );
}