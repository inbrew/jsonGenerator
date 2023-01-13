import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box, TextField, Button } from "@mui/material";

// recoil
import { useSetRecoilState, useRecoilState } from "recoil";
import { loadingState } from "../recoil/loading";
import { tabSelectState } from "../recoil/tabSelect";
import { addressState } from "../recoil/addressForMint";

// api
import { postDataApiCall } from "../APIs/apicall";

export default function Main() {
    const setLoading = useSetRecoilState(loadingState);
    const setTabSelect = useSetRecoilState(tabSelectState);
    const [isErr, setIsErr] = useState(false);
    const [address, setAddress] = useRecoilState(addressState);
    const navigate = useNavigate();

    const handleCheckAddress = async () => {
        setLoading({ isLoading: true });

        const result = await postDataApiCall("/address/check", address.address);

        if (result.data.data) {
            // 데이터가 잘 들어옴
            setIsErr(false);
            setTabSelect({ tabSelect: 'Json' })
            navigate('/Json');
            setLoading({ isLoading: false });
            console.log("address가 잘 들어왔습니다. address : ", address.address);
        } else {
            console.log(result)
            // 데이터가 잘 들어오지 않음.
            setAddress({ address: '' });
            setIsErr(true);
            setLoading({ isLoading: false });
            if (address.address === '') {
                console.log("address를 확인해주세요. address : ", address.address);
            }

        }

    }

    const handleInput = (inputAddress) => {
        setAddress({ address: inputAddress.target.value });
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