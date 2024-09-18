import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './slice/categorySlice';
import userSlice from './slice/userSlice';
import cartSlice from './slice/cartSlice';

const store = configureStore({
    reducer: {
        category: categorySlice,
        user: userSlice,
        cart: cartSlice,
    }
});

export default store;
