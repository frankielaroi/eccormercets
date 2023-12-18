'use client'
import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Card } from '@mui/material';

const Arrivals = () => {
  const [selectedHeader, setSelectedHeader] = useState("All");

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3001/next/user")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleHeaderChange = (header: string) => {
    setSelectedHeader(header);
  };

  return (
    <div>
      <Button color="inherit" onClick={() => handleHeaderChange("All")}>
        Account Details
      </Button>
      <Button color="inherit" onClick={() => handleHeaderChange("Apparel")}>
        WishList
      </Button>
      <Button color="inherit" onClick={() => handleHeaderChange("Clothing")}>
        Orders
      </Button>
      <Box mt={2}>
        {selectedHeader === "All" && <All />}
        {selectedHeader === "Apparel" && <AboutContent />}
        {selectedHeader === "Clothing" && <DressContent />}
      </Box>
    </div>
  );
};

const All = () => (
  <>
   
  </>
);

const AboutContent = () => <></>;

const DressContent = () => (
  <>
    <Typography variant="h1">Dress</Typography>
  </>
);


export default Arrivals;
function setItems(data: any): any {
  throw new Error('Function not implemented.');
}

