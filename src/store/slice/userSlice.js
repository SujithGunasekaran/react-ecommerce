import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
    isUserLoggedIn: false
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setIsUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload;
        },
        resetUserInfo: (state) => {
            state.isUserLoggedIn = false;
            state.userInfo = {}
        }
    }
});

export const { setUserInfo, setIsUserLoggedIn, resetUserInfo } = userSlice.actions;

export default userSlice.reducer;
