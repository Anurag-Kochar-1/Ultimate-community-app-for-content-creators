import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper";

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
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log(`---- extraReducers running FROM postSlice.tsx ----`);
            // console.log(action.payload);

            if(!action.payload.posts.allPostsData) {
                return state
            }
            state.allPostsData =  action.payload.posts.allPostsData
            
            
        },

    }
})

export const {setAllPosts} = postsSlice.actions
export default postsSlice.reducer