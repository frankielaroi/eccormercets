// Cart.js

import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';

const Cart = ({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  interface CartItem {
    id: string;
    name: string;
    price: number; 
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cart");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </Drawer>
  );
};
        

export default Cart;
