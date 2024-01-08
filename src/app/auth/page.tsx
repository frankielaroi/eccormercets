// Import necessary libraries and modules
"use client"
import React, { useState } from 'react';
import Login from './login';
import Signup from './signup';
import { Button, Typography } from '@mui/material';
import Header from '../header';
import Footer from '../footer';

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
      <Footer />
    </>
  );

  function Heade() {
    return (
      <div className='flex flex-col place-content-between'>
        <Header item={undefined} />
        <div className="flex place-content-evenly m-5 text-inherit">
          
        <Button variant='outlined' color="inherit" onClick={() => handleHeaderChange('Login')} className='px-5'>
          <Typography variant='h5' fontFamily={'serif'}>Login</Typography> 
        </Button>
          <Button     variant='outlined' color="inherit" onClick={() => handleHeaderChange('Signup')}>
          <Typography variant='h5'fontFamily={'serif'}>Sign Up</Typography> 
        </Button>
        </div>
               <marquee direction='right'><Typography variant='h6' fontFamily={'cursive'}>Wait a Few seconds after signing in it will redirect to a page</Typography></marquee> 
      </div>
    );
  }
}
