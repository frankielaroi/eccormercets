// Import necessary modules and components
'use client'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { ref as dbRef, push as dbPush } from 'firebase/database';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Typography, Box, Button, TextField, Input } from '@mui/material';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { storage, database } from "../firebase";

type Item = {
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
  });
  const timestampId = Date.now();

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
    setItem((prevItem) => ({ ...prevItem, images: imageUrl, id: timestampId }));
    }
  };

  const [image, setImage] = useState<File | null>(null);


const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, id: timestampId }));
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (image) {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      // Update the item state with the image URL
      setItem((prevItem) => ({ ...prevItem, images: imageUrl }));
    }

    // Save item to the Firebase database
    const itemsRef = dbRef(database, "items");
    const newItemRef = dbPush(itemsRef, item);

    // Clear the form after submitting
    setItem({
      Category: "",
      availability: true,
      average_rating: 0,
      breadcrumbs: "",
      color: "",
      images: "",
      name: "",
      selling_price: 0,
    });

    // Optionally, you can get the auto-generated ID of the new item
    const newItemId = newItemRef.key;
    console.log("New item ID:", newItemId);
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
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <TextField
          label="Category"
          name="Category"
          value={item.Category}
          onChange={handleChange}
          required
        />
        <TextField
          label="Name"
          name="name"
          value={item.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Selling Price"
          name="selling_price"
          value={item.selling_price}
          onChange={handleChange}
          required
        />
        <TextField
          label="Color"
          name="color"
          value={item.color}
          onChange={handleChange}
          required
        />
        <Input type="file" onChange={handleImageChange} required/>
        <TextField
          label="Breadcrumbs"
          name="breadcrumbs"
          value={item.breadcrumbs}
          onChange={handleChange}
          required
        />
        <TextField
          label="Availability"
          name="availability"
          value={item.availability}
                  onChange={handleChange}
                  type='boolean'
          required
        />
        <TextField
          label="Average Rating"
          name="average_rating"
          value={item.average_rating}
          onChange={handleChange}
          required
        />

        <Button type="submit" endIcon={<ArrowForwardIcon />}>
          ADD ITEM
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
