'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase';
import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import Footer from '@/app/footer';
import Header from '@/app/header';

interface Item {
  id:number,
 Category: string;
 availability: boolean;
 average_rating: number;
 breadcrumbs: string;
 color: string;
 images: string; // Assuming images is a string URL, adjust if it's an array
 index: number;
 name: string;
  selling_price: number;
  description: string;
 // Add other properties if needed
}

const ProductPage = () => {
  const { id } = useParams<any>(); // Update the type of id to any
  const [item, setItem] = useState<Item | null>(null);
  const [rerender, setRerender] = useState(false);

  const handleAddToCart = (item: Item) => {
      // Save item to local storage
      localStorage.setItem(
        'cartItems',
        JSON.stringify([...JSON.parse(localStorage.getItem('cartItems') || '[]'), item])
      );
    };


useEffect(() => {
  const getItem = async () => {
    if (id) {
      const itemRef = ref(database, `items/${id}`);
      try {
        const snapshot = await get(itemRef);
        if (snapshot.exists()) {
          setItem({ ...snapshot.val(), id: snapshot.key } as Item);
        } else {
          console.log('Item not found');
        }
      } catch (error) {
        console.log('Error getting item:', error);
      }
    }
  };

  getItem();
}, [id]);

 if (!item) {
    return <p>Loading...</p>;
 }

  return (
    <>
      <Header item={item}></Header>
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-full rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-auto object-fit" src={item.images} alt="Product Image" />
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <Button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"onClick={()=> handleAddToCart(item)} startIcon={<ShoppingCart />}>Add to Cart</Button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
           <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{item.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                   {item.breadcrumbs}
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
               <span className="text-gray-600 dark:text-gray-300">${item.selling_price}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
               <span className="text-gray-600 dark:text-gray-300">{item.availability}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                    <div className="flex items-center mt-2">
                        {item.color}
                    </div>
                </div>
               
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
               {item.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
   </div>
    <Footer></Footer>
</>
 );
};

export default ProductPage;