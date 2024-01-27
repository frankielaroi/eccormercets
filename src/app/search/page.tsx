// Import necessary modules and components
'use client'
import React, { useState, useEffect } from 'react';
import { ref, get, query, orderByChild, startAt, endAt } from 'firebase/database';
import { database } from '../firebase';
import { TextField, Button, Typography } from '@mui/material';

interface CartItem {
  id: string;
  name: string;
    selling_price: number;
    Category: string;
  images: string; // Assuming images is a string URL, adjust if it's an array
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CartItem[]>([]);

  useEffect(() => {
    // Function to fetch search results from Firebase
    const fetchSearchResults = async () => {
      if (searchQuery.trim() !== "") {
        const itemsRef = ref(database, "items");

        // Create a query to search by item name
        const searchQueryRef = query(
          itemsRef,
          orderByChild("name"),
          startAt(searchQuery.toLowerCase()),
          endAt(searchQuery.toLowerCase() + "\uf8ff")
        );

        try {
          const snapshot = await get(searchQueryRef);

          if (snapshot.exists()) {
            // Convert the snapshot to an array of items
            const searchResultsData: CartItem[] = Object.entries(
              snapshot.val()
            ).map(([id, data]: [string, any]) => ({
              id,
              ...data,
            }));
            setSearchResults(searchResultsData);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Error getting search results:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trigger a new search when the user submits the form
    setSearchResults([]);
    const searchInput = e.currentTarget.querySelector('input[name="search"]');
    if (searchInput) {
      const value = (searchInput as HTMLInputElement).value;
      setSearchQuery(value);
    }
  };

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ fontFamily: "serif", fontStyle: "italic" }}
        className="flex justify-center"
      >
        SEARCH PAGE
      </Typography>
      <form onSubmit={handleSearch} className="flex flex-col items-center mt-4">
        <TextField
          name="search"
          label="Search Items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button type="submit" variant="outlined" className="mt-2">
          Search
        </Button>
      </form>

      <div className="mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div key={item.id} className="mb-4">
              <h3>{item.name}</h3>
              <p>Category: {item.Category}</p>
              <p>Selling Price: ${item.selling_price}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
