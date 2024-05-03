import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./components/Auth/Login/userSlice"
import cartReducer from "./components/Menu/CartSlice"
import branchReducer from "./includes/Header/branchSlice"

const rootReducer = {
    user: userReducer,
    cart: cartReducer,
    branch: branchReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store;
