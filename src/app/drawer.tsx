// components/SideDrawer.ts
'use client'
import React,{useState} from 'react';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useUserStatus } from './userStatus' // Adjust the path as needed

const SideDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { userActive } = useUserStatus();

  const accountLink = userActive ? './account' : './auth';

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div className="pt-6 flex flex-col">
        <Typography
          variant="subtitle1"
          className="p-5 font-serif transition duration-150 ease-out hover:ease-in bg-[#B6BBC4] hover:bg-[#161A30]"
        >
          <Link href={accountLink}>Account</Link>
        </Typography>
        <Typography
          variant="subtitle1"
          className="p-5 font-serif transition duration-150 ease-out hover:ease-in bg-[#B6BBC4] hover:bg-[#161A30]"
        >
          <Link href='./categories' prefetch>Categories</Link> 
        </Typography>
        <Typography
          variant="subtitle1"
          className="p-5 font-serif transition duration-150 ease-out hover:ease-in bg-[#B6BBC4] hover:bg-[#161A30]"
        >
          Track An Order
        </Typography>
        <Typography
          variant="subtitle1"
          className="p-5 font-serif transition duration-150 ease-out hover:ease-in bg-[#B6BBC4] hover:bg-[#161A30]"
        >
          Settings
        </Typography>
        <Typography
          variant="subtitle1"
          className="p-5 font-serif transition duration-150 ease-out hover:ease-in bg-[#B6BBC4] hover:bg-[#161A30]"
        >
          Contact Us
        </Typography>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
