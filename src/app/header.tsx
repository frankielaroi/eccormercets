'use client'
//header.js
import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import SideDrawer from './drawer';
import { Menu } from '@mui/icons-material';
import { Badge, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Cart from './cart';
import Arrivals from './arrivals';
import Link from 'next/link'

const Header = ({ item }: { item: any }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCartopen, setCartOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleCartOpen = () => {
    setCartOpen(true);
  };
  const handleCartClose = () => {
    setCartOpen(false);
  };
  return (
    <div className="flex flex-row justify-between bg-[#E5E8ED] pt-3">
      <Button onClick={handleDrawerOpen}>
        <Menu sx={{ width: 40, height: 40, color: "darkblue" }}></Menu>
      </Button>
      <SideDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
      <Typography variant="h4" className="font-serif pt-3">
        <Link href={'./'}>
          Frankie
        </Link>
      </Typography>
      <div className="pt-3">
        <SearchIcon
          sx={{
            width: 40,
            height: 40,
          }}
          className=" hover:scale-150"
        />
        <Badge badgeContent={1} color="primary">
          <ShoppingBagOutlinedIcon
            className=" hover:scale-150"
            sx={{
              width: 40,
              height: 40,
            }}
            onClick={handleCartOpen}
          />
          <Cart isOpen={isCartopen} onClose={handleCartClose}></Cart>
        </Badge>
      </div>
      </div>
  );
};

export default Header;
