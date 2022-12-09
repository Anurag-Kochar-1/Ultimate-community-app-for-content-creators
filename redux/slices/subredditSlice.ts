import { createSlice } from "@reduxjs/toolkit"


export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const initialState = {
    subredditData: [],
    
};


const subredditSlice = createSlice({
    name: "subreddit",
    initialState ,
    reducers: {
        setSubreddit : (state, action) => {
            state.subredditData = action.payload
        }
    },

})

export const {setSubreddit} = subredditSlice.actions
export default subredditSlice.reducer


