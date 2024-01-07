'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { database } from '../firebase';
import { ref, onValue, getDatabase, off } from 'firebase/database';
import Link from 'next/link'

export default function Item() {
  const [selectedHeader, setSelectedHeader] = useState("All");
const [items, setItems] = useState<Item[]>([]);

  // Item interface...
  type Item = {
  id: number;
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

  const itemsListener = onValue(itemsRef, (snapshot) => {
    if (snapshot.exists()) {
const itemsData: Item[] = Object.entries(snapshot.val()).map(([id, data]: [string, any]) => ({
  id: parseInt(id),
  ...data
}));
      setItems(itemsData);
    } else {
      setItems([]);
    }
  });

  return () => {
    off(itemsRef, undefined); // Unsubscribe from the database listener
  };
}, []);


  const handleHeaderChange = (header: string) => {
    setSelectedHeader(header); // Just set the selected header directly
  };

  const ArrivalItem = ({ item }: { item: Item }) => {
    const handleAddToCart = (item: Item) => {
      // Save item to local storage
      localStorage.setItem(
        'cartItems',
        JSON.stringify([...JSON.parse(localStorage.getItem('cartItems') || '[]'), item])
      );
    };

    return (
     
     <div className="lg:w-1/4 md:w-1/2 p-4 w-full text-inherit bg-white">
        <a className="block relative h-48 rounded overflow-hidden">
          <Link href={`../product/${item.id}`}> 
        <img 
          src={item.images}
          alt="Your Image Alt Text"
          width={1920}
          height={1080}
            />
            </Link>
      </a>

      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {item.Category}
        </h3>

        <h2 className="text-gray-900 title-font text-lg font-medium">
          {item.name}
        </h2>

        <p className="mt-1">${item.selling_price}</p>

        <IconButton
          onClick={() => handleAddToCart(item)}
          color="primary"
          aria-label="Add to Cart"
        >
          <ShoppingCartIcon />
        </IconButton>
      </div>
    </div>
    
    );
  };

  const filterItemsByCategory = () => {
    if (!Array.isArray(items)) {
      return [];
    }

    if (selectedHeader === "All") {
      return items;
    } else {
      return items.filter((item:any) => item.Category === selectedHeader);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between text-inherit bg-white">
        <Button color="inherit" onClick={() => handleHeaderChange("All")}>
          All
        </Button>
         <Button color="inherit" onClick={() => handleHeaderChange("Others")}>
          Others
        </Button>
        <Button color="inherit" onClick={() => handleHeaderChange("Clothing")}>
        Clothing
        </Button>
         <Button color="inherit" onClick={() => handleHeaderChange("Shoes")}>
          Shoes
        </Button>
      </div>

      <div>
        {items &&
          filterItemsByCategory().map((item: Item) => (
            <ArrivalItem key={item.index} item={item} />
          ))}
        {!items && <p>Loading...</p>}
        {items && filterItemsByCategory().length === 0 && (
          <p>No items found for the selected category.</p>
        )}
      </div>

      <Box mt={2}>
        {selectedHeader}
      </Box>
    </div>
  );
}
