import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from "./slices/subredditSlice"
import userReducer from "./slices/userSlice"
import postsReducer from "./slices/postsSlice"

const store = configureStore({
    reducer : {
        subreddit: subredditReducer,
        user: userReducer,
        posts: postsReducer
    }
})

export { store }

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch