import { createSlice } from '@reduxjs/toolkit';
import { getBrandNames, getRatings } from '../../utils/categoryUtils';

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
            const brand = getBrandNames(products);
            const ratings = getRatings();
            state.categoryProduct = {
                ...state.categoryProduct,
                [selectedCategory]: {
                    products,
                    productFilters: [
                        {
                            name: 'brand',
                            displayName: 'Brand',
                            filters: brand,
                            type: 'checkbox',
                        },
                        {
                            name: 'rating',
                            displayName: 'Ratings',
                            filters: ratings,
                            type: 'checkbox',
                        }
                    ]
                }
            }
        }
    }
});

export const { addCategory, updateCategoryProduct } = categorySlice.actions;

export default categorySlice.reducer;
