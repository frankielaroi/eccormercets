// store/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  color: string;
  images: string | undefined;
  id: string;
  quantity: number;
  name: string;
  selling_price: number;
  // Add other fields as necessary
}

interface CartState {
  items: Item[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.selling_price;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.total -= item.selling_price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: state => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
