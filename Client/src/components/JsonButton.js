import React from "react";

// MUI css
import { Button } from "@mui/material";

// api
// import { getApiCall } from "../APIs/apicall";

export default function JsonButton() {
    const handleCreateButton = async () => {
        // await getApiCall();
    }

    return (
        <>
            <Button onClick={handleCreateButton} variant="contained">
                Create Json
                <input
                    type="file"
                    hidden
                />
            </Button>
        </>
    );
}