import React from "react";

// MUI css
import { Button } from "@mui/material";


export default function JsonButton() {
    const handleCreateButton = () => {
        console.log("잘눌림");
    }

    return (
        <>
            <Button onClick={handleCreateButton} variant="contained">Create Json</Button>
        </>
    );
}