import { configureStore } from '@reduxjs/toolkit';
import communityReducer from "./slices/communitySlice"
import userReducer from "./slices/userSlice"
import postsReducer from "./slices/postsSlice"

const store = configureStore({
    reducer : {
        user: userReducer,
        community: communityReducer,
        posts: postsReducer
    }
})

export { store }

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch