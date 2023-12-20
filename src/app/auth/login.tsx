import { Apple, Facebook, Google } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React from "react";

export default function Login() {
    return (
        <div className="flex flex-col place-content-center py-40">
            <div className="flex flex-col place-items-center p-10">
                <div className="flex justify-center">
                    <Button startIcon={<Google />} />
                    <Button startIcon={<Facebook />} />
                    <Button startIcon={<Apple />} />
                </div>
        
                <div className="flex flex-col place-items-center p-10">
                    <TextField
                        label='Email'
                        fullWidth={true}
                        sx={{
                            maxWidth: 700,
                            margin: 'auto'
                        }}
                    />
                </div>
        
                <div className="flex flex-col place-items-center">
                    <TextField
                        label='Password'
                        fullWidth={true}
                        sx={{
                            maxWidth: 500,
                            margin: ' auto'
                        }}
                    />
                </div>
        
            </div>
        </div>
    )
}
