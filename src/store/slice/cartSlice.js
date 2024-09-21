import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userCarts: [],
    userCartCount: 0,
    isLoading: true,
    hasError: false,
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addUserCartInfo: (state, action) => {
            state.userCarts = action.payload;
            state.userCartCount = action.payload?.length ?? 0;
        },
        addProductToCart: (state, action) => {
            state.userCarts = [
                ...state.userCarts,
                action.payload
            ];
            state.userCartCount = state.userCarts.length;
        },
        removeProductFromCart: (state, action) => {
            state.userCarts = state.userCarts.filter((product) => product.id !== action.payload);
            state.userCartCount = state.userCarts.length;
        },
        updateProductQuantity: (state, action) => {
            state.userCarts = state.userCarts.map((product) => {
                if (product.id === action.payload.id) {
                    return {
                        ...action.payload,
                    }
                }
                return product
            })
        },
        resetUserCartInfo: (state) => {
            state.userCarts = [];
            state.userCartCount = 0;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setHasError: (state, action) => {
            state.hasError = action.payload;
        }
    }
});

export const {
    addUserCartInfo,
    resetUserCartInfo,
    setLoading,
    setHasError,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
