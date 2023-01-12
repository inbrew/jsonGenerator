import React from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box } from "@mui/material";

// recoil
import { useSetRecoilState } from "recoil";
import { tabSelectState } from "../recoil/tabSelect";
import { loadingState } from "../recoil/loading";
import { fileNumState } from "../recoil/files";
import { readyState } from "../recoil/nftReady";

// api
import { postApiCall } from "../APIs/apicall";

export default function UploadFile() {
    const navigate = useNavigate();
    const setTabSelect = useSetRecoilState(tabSelectState);
    const setLoading = useSetRecoilState(loadingState);
    const setFileNum = useSetRecoilState(fileNumState);
    const setIsReady = useSetRecoilState(readyState);

    const handleUploadFiles = async (e) => {
        e.preventDefault();
        setLoading({ isLoading: true });
        let file = e.target.file.files[0];
        // let files = [...e.target.file.files];

        console.log(file);
        const formData = new FormData();
        // files.forEach((file) => {
        formData.append("file", file);
        // });

        const result = await postApiCall("/file/upload", formData);
        console.log(result);

        if (result) {
            setLoading({ isLoading: false });
            setFileNum({ count: 1 });
            setIsReady({ isReady: true });

            // 서버로 보내서 url 받으면 NFT페이지로 넘기자.
            setTabSelect({ tabSelect: "NFT" });
            navigate("/NFT");
        }
    };

    return (
        <>
            <Box sx={{ mt: "5%" }}>
                <form encType="multipart/form-data" onSubmit={handleUploadFiles}>
                    <input type="file" name="file" multiple />
                    <button type="submit">이미지 업로드</button>
                </form>
            </Box>
        </>
    );
}
