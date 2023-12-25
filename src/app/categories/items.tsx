'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { database } from '../firebase';
import { ref, onValue, getDatabase } from 'firebase/database';

export default function Item() {
  const [selectedHeader, setSelectedHeader] = useState("All");
  const [items, setItems] = useState([]);
 interface Item {
  Category: string;
  availability: boolean;
  average_rating: number;
  breadcrumbs: string;
  color: string;
  images: string; // Assuming images is a string URL, adjust if it's an array
  index: number;
  name: string;
  selling_price: number;
  // Add other properties if needed
}

 useEffect(() => {
  const itemsRef = ref(database, 'items');

  try {
    onValue(itemsRef, (snapshot) => {
      if (snapshot.exists()) {
        const itemsData: Item[] = Object.values(snapshot.val());
        setItems(itemsData);
      } else {
        setItems([]);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}, []);

 
  const handleHeaderChange = (header: string) => {
    setSelectedHeader(header.toLowerCase());
  };

  const ArrivalItem = ({ item }: { item: any }) => {
     const handleAddToCart = (item: any) => {
    // Save item to local storage
    localStorage.setItem('cartItems', JSON.stringify([...JSON.parse(localStorage.getItem('cartItems') || '[]'), item]));
  };

    return (
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            src={item.images}
            alt="Your Image Alt Text"
            width={1920}
            height={1080}
          />
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {item.category}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {item.name}
          </h2>
          <p className="mt-1">${item.selling_price}
          </p>
           <IconButton
          onClick={() => handleAddToCart(item)}
          color="primary"
          aria-label="Add to Cart"
          >
            <ShoppingCartIcon />
        </IconButton>
        </div>
      </div>
    )
  }
const filterItemsByCategory = () => {
    let filteredItems;
  if (!Array.isArray(items)) {
    return [];
  }

  if (selectedHeader === "All") {
    filteredItems = items;
  } else {
    filteredItems = items.filter(
      (item: any) => item.category === selectedHeader
    );
  }

  // Return only the first four items
  return filteredItems
};



  return (
    <div>
      <div className="flex flex-row justify-between">
        <Button color="inherit" onClick={() => handleHeaderChange("All")}>
          All
        </Button>
        <Button
          color="inherit"
          onClick={() => handleHeaderChange("Accessories")}
        >
          Accessories
        </Button>
        <Button color="inherit" onClick={() => handleHeaderChange("Clothing")}>
          Clothing
        </Button>
        <Button color="inherit" onClick={() => handleHeaderChange("Tshirt")}>
          Tshirt
        </Button>
        <Button color="inherit" onClick={() => handleHeaderChange("Shoes")}>
          Shoes
        </Button>
      </div>

      <div>
        {items &&
          filterItemsByCategory().map((item: any) => (
            <ArrivalItem key={item.id} item={item} />
          ))}
        {!items && <p>Loading...</p>}
        {items && filterItemsByCategory().length === 0 && (
          <p>No items found for the selected category.</p>
        )}
      </div>

      <Box mt={2}>
        {selectedHeader === "All"}
        {selectedHeader === "Accessories"}
        {selectedHeader === "Clothing"}
        {selectedHeader === "Tshirt"}
        {selectedHeader === "Shoes"}
      </Box>
    </div>
  );
}
