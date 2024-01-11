'use client'
import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Clear,ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import Link from "next/link";

const Cart = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  }) => {
  const router = useRouter();
  interface CartItem {
    index: number;
    id: string;
    name: string;
    selling_price: number;
    description: string;
    images: string,
    color:string
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch items from local storage when the component mounts
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCartItems(parsedItems);
    }
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.selling_price, 0).toFixed(2);
  };

 const handleRemoveFromCart = (item: CartItem) => {
  // Filter out the specific item by its id
  const updatedCartItems = cartItems.filter((cartItem) => cartItem.index !== item.index);

  // Update the state with the new cart items
  setCartItems(updatedCartItems);

  // Save the updated items back to local storage
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  const handleCheckout = () => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Navigate to the checkout page;
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose} sx={{
      maxWidth:20
    }}>
      <div className="flex flex-col place-content-between bg-white">
      <div className="flex flex-row place-content-between"> <h2 className="p-5"><ShoppingCart sx={{minHeight:30,minWidth:30}}/> Shopping Cart</h2>
      <IconButton onClick={onClose} sx={{width:50,height:50}}><Clear sx={{}}/></IconButton></div>
      <ul>
        {cartItems &&
          cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <li key={item.id}>
               <div className="flex flex-row"> <img src={item.images} width='40%' height='30%'/>
                  <div className="flex flex-col"> {item.name}
                     <Typography variant="body1">{item.color}</Typography>
                    <IconButton onClick={() => handleRemoveFromCart(item)} sx={{
                      maxWidth: 50,
                      maxHeight:50,
                    }}>
                     
                  <DeleteIcon className="border-2	border-solid	border-inherit"/>
                    </IconButton>
                  </div>
                  <div>Price: ${item.selling_price}</div></div>
              </li>
            );
          })}
      </ul>
        <div >
          <p className="pt-20">Total Price: ${calculateTotalPrice()}</p></div>
        <Button variant="outlined" fullWidth sx={{
          width: 250,
          height: 30,
          marginTop: 5,
        }}
startIcon={<ShoppingCartCheckout />} onClick={handleCheckout} ><Link href={'./checkout'} prefetch>CHECKOUT</Link></Button>      </div>
    </Drawer>
  );
};

export default Cart;
