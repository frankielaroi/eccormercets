// Arrivals.js
'use client'
import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";



import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Cart from './cart'; // Make sure to import the correct path
import Link from 'next/link';

const Arrivals = ({ onAddToCart }: { onAddToCart: (product: any) => void }) => {

  const [items, setItems] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState('All');
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:3001/next/products')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleHeaderChange = (header: string) => {
    setSelectedHeader(header);
  };



const handleAddToCart = (item: any) => {
    onAddToCart(item);
  };


  const ArrivalItem = ({ item }: { item: any }) => (
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

  const filterItemsByCategory = () => {
    let filteredItems;

    if (!Array.isArray(items)) {
      return [];
    }

    if (selectedHeader === "All") {
      filteredItems = items;
    } else {
      filteredItems = items.filter(
        (item: any) => item.Category === selectedHeader
      );
    }

    // Return only the first four items
    return filteredItems.slice(0, 4);
  };

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ fontFamily: "serif", fontStyle: "italic" }}
        className="flex justify-center"
      >
        NEW ARRIVALS
      </Typography>
      <div className="flex flex-row justify-between">
        <Button color="inherit" onClick={() => handleHeaderChange("All")}>
          All
        </Button>
        <Button
          color="inherit"
          onClick={() => handleHeaderChange("Accessories")}
        >
          Accessories
        </Button>{" "}
        <Button color="inherit" onClick={() => handleHeaderChange("Clothing")}>
          Clothing
        </Button>{" "}
        <Button color="inherit" onClick={() => handleHeaderChange("Tshirt")}>
          Tshirt
        </Button>{" "}
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
      <div className="flex justify-center">
        <Button
          endIcon={<ArrowForwardIcon />}
          onClick={() => setShowCart(!showCart)}
        >
          <Link href="./categories"> EXPLORE MORE</Link>
        </Button>
        {showCart && (
          <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
        )}
      </div>
    </div>
  );

};

export default Arrivals;

 
 /* */