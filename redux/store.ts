import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from "./subredditSlice"
import userReducer from "./slices/userSlice"

const store = configureStore({
    reducer : {
        subreddit: subredditReducer,
        user: userReducer
    }
})

export { store }