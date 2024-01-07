// CheckoutPage.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, ref, push, set } from 'firebase/database';
import { database } from '../firebase';
import Cookies from 'js-cookie';
import { Button, TextField } from '@mui/material';

interface CartItem {
  id: string;
  name: string;
  selling_price: number;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [userContact,setContact]=useState<number>()

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
  }, []);

  const user = Cookies.get('uid');
  

  const placeOrder = async () => {
    try {
      const orderData = {
        userId: user, // Replace with actual user ID
        items: cartItems,
        totalAmount,
        userContact,
        orderDate: new Date().toISOString(),
      };

      // Make API call to initiate money request
      const apiResponse = await initiateMoneyRequest(orderData);

      if (apiResponse === true) {
        // If the API response is true, store the order in the database
        const ordersRef = ref(database, 'orders');
        const newOrderRef = push(ordersRef);
        await set(newOrderRef, orderData);

        // Optionally, you can clear the user's cart or perform other necessary actions
        localStorage.removeItem('cartItems');

        console.log('Order placed successfully!');
        router.push('/orders'); // Redirect to orders page or any other desired page
      } else {
        console.error('Money request initiation failed.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const initiateMoneyRequest = async (orderData: any) => {
    try {
      const mobileNumber = userContact;
      const resp = await fetch(
        `https://devp-reqsendmoney-230622-api.hubtel.com/request-money/${mobileNumber}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + Buffer.from('<username>:<password>').toString('base64'),
          },
          body: JSON.stringify({
            amount: orderData.totalAmount,
            title: 'Order Payment',
            description: 'Payment for order',
            clientReference: orderData.userId,
            callbackUrl: 'http://example.com',
            cancellationUrl: 'http://example.com',
            returnUrl: 'http://example.com',
            logo: 'http://example.com',
          }),
        }
      );

      const data = await resp.json();
      console.log(data);

      // Assuming the API response contains a 'success' field indicating the success of the money request
      return data.success === true;
    } catch (error) {
      console.error('Error initiating money request:', error);
      return false;
    }
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
        <TextField value={userContact}/>
      </div>
      <Button variant={'contained'} onClick={placeOrder}>Place Order</Button>
    </div>
  );
};

export default CheckoutPage;
