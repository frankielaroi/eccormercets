'use client'
import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { Button } from "@mui/material";

export default function User() {
  const [selectedHeader, setSelectedHeader] = useState('Login');

  const handleHeaderChange = (header: string) => {
    setSelectedHeader(header);
  };
  
  if (selectedHeader === "Login") {
    return (
      <>
        <Heade />
        <div  className="p-5">
        <Signup /></div>
      </>
    );
  }
  
  function Heade() {
    return (
      <div className="absolute">
        <Button color="inherit" onClick={() => handleHeaderChange('Login')}>
          Login
        </Button>
        <Button color="inherit" onClick={() => handleHeaderChange('Signup')}>
          Sign Up
        </Button>
      </div>
    );
  }
  
}