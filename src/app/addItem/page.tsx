// Import necessary modules and components
'use client';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { ref as dbRef, push as dbPush } from 'firebase/database';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Button, TextField, Input } from '@mui/material';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { storage, database } from "../firebase";
import Cookies from 'js-cookie'

type Item = {
  userId: any;
  id?: string;
  Category: string;
  availability: boolean;
  average_rating: number;
  breadcrumbs: string;
  color: string;
  images: string;
  name: string;
  selling_price: number;
  
  // Add other properties if needed
};
 const userId= Cookies.get('uid');
const AddItem = () => {
  const [item, setItem] = useState<Item>({
    Category: "",
    availability: true,
    average_rating: 0,
    breadcrumbs: "",
    color: "",
    images: "",
    name: "",
    selling_price: 0,
    userId, // Add userId to the item structure

  });
       

  const router = useRouter();
   useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn =  Cookies.get('isLoggedIn') === 'true';

    // If not logged in, redirect to the login page
    if (!isLoggedIn) {
      router.push('/auth'); // Adjust the route to your login page
     }
      const userIdFromCookie = Cookies.get('uid');
    setItem((prevItem) => ({ ...prevItem, userId: userIdFromCookie || '' }));
  }, [router]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      setItem((prevItem) => ({ ...prevItem, images: imageUrl }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";

    if (isLoggedIn && item.images) {
      // Save item to the Firebase database
      const itemsRef = dbRef(database, "items");
      const newItemRef = dbPush(itemsRef, item);

      // Clear the form after submitting
      setItem({ // Use the auto-generated key as id
        Category: "",
        availability: true,
        average_rating: 0,
        breadcrumbs: "",
        color: "",
        images: "",
        name: "",
        selling_price: 0,
        userId: item.userId ?? "", // Changed to use nullish coalescing
      });

      router.push(`/product/${newItemRef.key}`);
      // Optionally, you can get the auto-generated ID of the new item
      const newItemId = newItemRef.key;
      console.log("New item ID:", newItemId);
    } else {
      console.error("Image URL is missing. Please upload an image.");
    }
  };



  return (
    <div>
      <Typography
        variant="h3"
        sx={{ fontFamily: "serif", fontStyle: "italic" }}
        className="flex justify-center"
      >
        ADD NEW ITEM
      </Typography>
      <div className='flex place-content-center'>
        <form onSubmit={handleSubmit} className='flex flex-col place-content-evenly'>
          <div className='flex flex-col place-items-evenly'>
            <TextField
              label="Category"
              name="Category"
              className='p-2'
              value={item.Category}
              onChange={handleChange}
              required
              sx={{ width: 500 }}
            />
            <TextField
              label="Name"
              name="name"
              className='p-2'
              value={item.name}
              onChange={handleChange}
              required
              sx={{ width: 500 }}
            />
            <TextField
              label="Selling Price"
              name="selling_price"
              className='p-2'
              value={item.selling_price}
              onChange={handleChange}
              required
              sx={{ width: 500 }}
            />
            <TextField
              label="Color"
              name="color"
              value={item.color}
              onChange={handleChange}
              required
              sx={{ width: 500 }}
              className='p-2'
            />
            <Input type="file" onChange={handleImageChange} required />
            <TextField
              label="Breadcrumbs"
              name="breadcrumbs"
              value={item.breadcrumbs}
              onChange={handleChange}
              required
              sx={{ width: 500 }}
              className='p-2'
            />
            <TextField
              label="Availability"
              name="availability"
              value={item.availability}
              onChange={handleChange}
              type='boolean'
              required
              sx={{ width: 500 }}
              className='p-2'
            />
            <TextField
              label="Average Rating"
              name="average_rating"
              value={item.average_rating}
              onChange={handleChange}
              required
              sx={{ width: 500 }}
              className='p-2'
            />

            <Button variant='outlined' sx={{ width: 200 }} type="submit" endIcon={<ArrowForwardIcon />}>
              ADD ITEM
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
