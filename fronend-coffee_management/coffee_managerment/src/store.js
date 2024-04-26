import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./components/Auth/Login/AuthSlice"

const rootReducer = {
    Auth: AuthReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;