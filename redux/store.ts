import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from "./subredditSlice"

const store = configureStore({
    reducer : {
        subreddit: subredditReducer
    }
})

export { store }