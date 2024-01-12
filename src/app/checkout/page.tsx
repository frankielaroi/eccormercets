// CheckoutPage.tsx
'use client'
// CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, ref, push, set } from 'firebase/database';
import { database } from '../firebase';
import Cookies from 'js-cookie';
import { Button,TextField } from '@mui/material';
import { PaystackButton } from 'react-paystack'
import Image from 'next/image'


interface CartItem {
  id: string;
  name: string;
  selling_price: number;
  images: string; // Assuming images is a string URL, adjust if it's an array

}

const CheckoutPage: React.FC = () => {
  const publicKey = 'pk_test_696369ceee103648c4353e3d040374e7d91094e0';
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [number, setNumber] = useState<string>('');
  const [user, setUser] = useState<string | undefined>();
  const [name, setName] = useState<string>('')

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
  const amount = totalAmount
  const metadata = {
  name:name,
  phone:number,
  custom_fields: [],
};

  const componentProps = {
    email,
    amount,
     metadata: metadata,
    publicKey,
    text: 'Buy Now',
    onSuccess: () => {
      alert(
        `Your purchase was successful! Transaction reference`
      );
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div className="text-inherit bg-white">
      <div>
        <h1>Checkout Page</h1>
        <div>
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                <div className="xl:w-full flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10">
                  <div className="flex flex-col justify-start items-start w-full space-y-4">
                    <p className="text-xl md:text-2xl leading-normal text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-base font-semibold leading-none text-gray-600">
                      ${item.selling_price}
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                    <Image
                      src={item.images}
                      alt="headphones"
                      width={50}
                      height={60}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <p>Total Amount: ${totalAmount}</p>
          <div className="flex flex-col">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              label="Name"
              sx={{
                width: 500,
              }}
            />
            <TextField
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Mobile Number"
              label="Mobile Number"
              sx={{
                width: 500,
              }}
            />
          </div>
        </div>
        <PaystackButton {...componentProps} className="b">
          Place Order
        </PaystackButton>
      </div>
    </div>
  );
};


