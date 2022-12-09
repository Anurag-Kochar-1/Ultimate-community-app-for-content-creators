import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allPostsData: []
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setAllPosts: (state,action) => {
            state.allPostsData = action.payload
        }
    }
})

export const {setAllPosts} = postsSlice.actions
export default postsSlice.reducer