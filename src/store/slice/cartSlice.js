import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userCartInfo: {},
    userCartCount: 0,
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addUserCartInfo: (state, action) => {
            state.userCartInfo = action.payload;
            const cartCount = action.payload?.products?.length ?? 0;
            state.userCartCount = cartCount > 10 ? '9+' : `${cartCount}`
        },
        resetUserCartInfo: (state) => {
            state.userCartInfo = {};
            state.userCartCount = 0;
        }
    }
});

export const { addUserCartInfo, resetUserCartInfo } = cartSlice.actions;

export default cartSlice.reducer;
