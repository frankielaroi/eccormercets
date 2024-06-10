// components/Header.tsx
'use client';
import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import SideDrawer from './drawer';
import { Menu } from '@mui/icons-material';
import { Badge, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Link from 'next/link';
import Cart from './cart';
import store, { RootState } from './redux/store';

const Header = ({ item }: { item: any }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
    <Provider store={store}>
    <div className="flex flex-row justify-between pt-3 mx-5">
      <Button onClick={handleDrawerOpen}>
        <Menu sx={{ width: 40, height: 40, color: 'darkblue' }} />
      </Button>
      <SideDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
      <Typography variant="h4" className="font-serif pt-3">
        <Link href="/">Frankie</Link>
      </Typography>
      <div className="pt-3">
        <Link href="/search">
          <SearchIcon sx={{ width: 40, height: 40 }} className="hover:scale-150" />
        </Link>
        <Badge badgeContent={cartItemsCount} color="primary">
          <ShoppingBagOutlinedIcon
            className="hover:scale-150"
            sx={{ width: 40, height: 40 }}
            onClick={handleCartOpen}
          />
        </Badge>
        <Cart isOpen={isCartOpen} onClose={handleCartClose} />
      </div>
      </div>
      </Provider>
  );
};

export default Header;
