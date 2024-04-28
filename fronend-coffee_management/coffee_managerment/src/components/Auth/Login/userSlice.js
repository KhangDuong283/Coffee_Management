// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.userInfo = null;
        },
    },
});

const { actions, reducer } = userSlice;
export const { login, logout } = actions;
export default reducer;