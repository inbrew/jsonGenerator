import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box, Button } from "@mui/material";
// import FileUpload from "react-mui-fileuploader";

// recoil
import { useSetRecoilState } from "recoil";
import { tabSelectState } from "../recoil/tabSelect";

// api
import { postApiCall } from "../APIs/apicall";

export default function UploadFile() {
    const navigate = useNavigate();
    const [filesToUpload, setFilesToUpload] = useState([]);
    const setTabSelect = useSetRecoilState(tabSelectState);

    const handleFilesChange = (files) => {
        setFilesToUpload([...files]);
    }

    const uploadFiles = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        filesToUpload.forEach(file => {
            formData.append("file", file);
        });

        for (let i of formData.values()) {
            console.log(i);
        }

        const result = await postApiCall("/upload",);

        // 서버로 보내서 url 받으면 NFT페이지로 넘기자.
        setTabSelect({ tabSelect: 'NFT' });
        navigate("/NFT");
    }

    return (
        <>
            <Box>
                {/* <FileUpload
                    component="label"
                    multiFile={true}
                    onFilesChange={handleFilesChange}
                    onContextReady={(context) => { }}
                    allowedExtensions={['jpg', 'jpeg', 'png']}
                /> */}
                <Box sx={{ mt: "5%" }}>
                    <Button
                        onClick={uploadFiles}
                        variant="contained"
                        id="uploadButton"
                    >
                        UpLoad
                    </Button>
                </Box>
            </Box>

            <form
                encType="multipart/form-data"
                onSubmit={handleFilesChange}
            >
                <input type="file" name="img" multiple />
                <input type="submit" />
            </form>

        </>

    );
}