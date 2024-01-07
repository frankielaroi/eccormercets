// Import necessary libraries and modules
"use client"
import React, { useState } from 'react';
import Login from './login';
import Signup from './signup';
import { Button } from '@mui/material';

export default function User() {
  const [selectedHeader, setSelectedHeader] = useState('Login');

  const handleHeaderChange = (header: string) => {
    setSelectedHeader(header);
  };

  return (
    <>
      <Heade />
      <div className="p-5">
        {selectedHeader === 'Login' ? <Login /> : <Signup />}
      </div>
    </>
  );

  function Heade() {
    return (
      <div className="flex place-content-center p-0 text-inherit">
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
