import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./components/Auth/Login/userSlice"
import cartReducer from "./components/Menu/CartSlice"

const rootReducer = {
    user: userReducer,
    cart: cartReducer,

}

const store = configureStore({
    reducer: rootReducer
})

export default store;
