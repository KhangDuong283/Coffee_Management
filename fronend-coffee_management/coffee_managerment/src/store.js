import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./components/Auth/Login/userSlice"

const rootReducer = {
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;