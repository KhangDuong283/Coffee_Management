import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "Auth",
    initialState: false,
    reducers: {
        login(state) {
            return true;
        },
        logout(state) {
            return false;
        }
    }
})

const { actions, reducer } = AuthSlice;
export const { login, logout } = actions; // name export
export default reducer; // default export
