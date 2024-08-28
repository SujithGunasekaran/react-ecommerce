import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: []
};

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories = action.payload;
        }
    }
});

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;