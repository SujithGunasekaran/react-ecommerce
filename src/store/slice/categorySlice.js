import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    categoryProduct: {}
};

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories = action.payload;
        },
        updateCategoryProduct: (state, action) => {
            const { payload } = action;
            const { selectedCategory, products } = payload;
            state.categoryProduct = {
                ...state.categoryProduct,
                [selectedCategory]: products
            }
        }
    }
});

export const { addCategory, updateCategoryProduct } = categorySlice.actions;

export default categorySlice.reducer;