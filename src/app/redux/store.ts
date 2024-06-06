// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        cart:cartSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState =ReturnType<typeof store.getState>;

export default store;
