// CheckoutPage.tsx
'use client'
// CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, ref, push, set } from 'firebase/database';
import { database } from '../firebase';
import Cookies from 'js-cookie';
import { Button, TextField } from '@mui/material';
import { PaystackButton } from 'react-paystack'


interface CartItem {
  id: string;
  name: string;
  selling_price: number;
}

const CheckoutPage: React.FC = () => {
  const publicKey='pk_test_696369ceee103648c4353e3d040374e7d91094e0';
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [number, setNumber] = useState<string>('');
  const [user, setUser] = useState<string | undefined>();
  const [name,setName]=useState<string>('')

  useEffect(() => {
    const retrieveCartItems = () => {
      // Retrieve cart items from local storage
      const storedCart = localStorage.getItem('cartItems');
      const parsedCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
      setCartItems(parsedCart);

      // Calculate total amount
      const total = parsedCart.reduce((acc, item) => acc + item.selling_price, 0);
      setTotalAmount(total);
    };

    retrieveCartItems();

    // Retrieve user ID from cookies
    const userId = Cookies.get('uid');
    
    setUser(userId);
  }, []);
const email = Cookies.get('email') || '';
  const placeOrder = async () => {
    try {
      const orderData = {
        userId: user, // Replace with actual user ID
        items: cartItems,
        totalAmount,
        number,
        orderDate: new Date().toISOString(),
      };

      // Make API call to initiate Paystack transaction

      // If the Paystack API response is successful, store the order in the database
      const ordersRef = ref(database, 'orders');
      const newOrderRef = push(ordersRef);
      await set(newOrderRef, orderData);

      // Optionally, you can clear the user's cart or perform other necessary actions
      localStorage.removeItem('cartItems');

      console.log('Order placed successfully!');
    } finally {
      router.push('/orders'); // Redirect to orders page or any other desired page
    }
   
 

  
  


  };
  const componentProps = {
  email,
  amount: totalAmount,
  metadata: {
    custom_fields: [
      {
        display_name: "Name",
        variable_name: "name",
        value: name,
      },
      {
        display_name: "Phone Number",
        variable_name: "phone",
        value: number,
      },
    ],
  },
  publicKey,
  text: "FRANKIE MADE THIS",
  onSuccess: placeOrder,
  onClose: () => alert("Wait! Don't leave :("),
};

  return (
    <div className='text-inherit bg-white'>
      <h1>Checkout Page</h1>
      <div>
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id}>
            <p>{item.name} - ${item.selling_price}</p>
          </div>
        ))}
        <p>Total Amount: ${totalAmount}</p>
        <TextField
          value={name}
          label="Your Name"
          onChange={(e) => setNumber(e.target.value)}
        />
        <TextField
          value={number}
          label="Contact Number"
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <PaystackButton  {...componentProps}>
        Place Order
      </PaystackButton>
    </div>
  );
};

export default CheckoutPage;
