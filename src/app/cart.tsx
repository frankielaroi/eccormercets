// components/Cart.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Clear, ShoppingCart, ShoppingCartCheckout } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { removeItem, clearCart } from './redux/slices/cartSlice';
import { RootState, AppDispatch } from './redux/store';

const Cart = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.selling_price * item.quantity, 0).toFixed(2);
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const handleCheckout = () => {
    router.push('/checkout');
    dispatch(clearCart());
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="flex flex-col place-content-between bg-white">
        <div className="flex flex-row place-content-between">
          <h2 className="p-5">
            <ShoppingCart sx={{ minHeight: 30, minWidth: 30 }} /> Shopping Cart
          </h2>
          <IconButton onClick={onClose} sx={{ width: 50, height: 50 }}>
            <Clear />
          </IconButton>
        </div>
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="flex flex-row">
              <img src={item.images} alt={item.name} width="40%" height="30%" />
              <div className="flex flex-col">
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2">{item.color}</Typography>
                <IconButton
                  onClick={() => handleRemoveFromCart(item.id)}
                  sx={{ maxWidth: 50, maxHeight: 50 }}
                >
                  <DeleteIcon className="border-2 border-solid border-inherit" />
                </IconButton>
              </div>
              <Typography variant="body2">Price: ${item.selling_price}</Typography>
            </li>
          ))}
        </ul>
        <div>
          <Typography variant="h6" className="pt-20">
            Total Price: ${calculateTotalPrice()}
          </Typography>
        </div>
        <Button
          variant="outlined"
          fullWidth
          sx={{ width: 250, height: 30, marginTop: 5 }}
          startIcon={<ShoppingCartCheckout />}
          onClick={handleCheckout}
        >
          <Link href="/checkout" prefetch>
            CHECKOUT
          </Link>
        </Button>
      </div>
    </Drawer>
  );
};

export default Cart;
