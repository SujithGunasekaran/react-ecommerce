import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    currentPage: 0,
    hasMoreProduct: true,
};

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = [
                ...state.products,
                ...action.payload
            ];
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setHasMoreProducts: (state, action) => {
            state.hasMoreProduct = action.payload;
        }
    }
});

export const { setProducts, setCurrentPage, setHasMoreProducts } = productSlice.actions;

export default productSlice.reducer;
