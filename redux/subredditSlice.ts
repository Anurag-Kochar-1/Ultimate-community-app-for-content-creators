import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const subredditSlice = createSlice({
    name: "subreddit",
    initialState: {
        data: []
    },
    reducers: {
        setSubreddit (state, action) {
            state.data = action.payload
        }
    },

    // extraReducers: (builder) => {
        
    // }
})

export const {setSubreddit} = subredditSlice.actions
export default subredditSlice.reducer


// export const fetchSubreddit = createAsyncThunk(`/r/${id}` , async (id) => {

// })