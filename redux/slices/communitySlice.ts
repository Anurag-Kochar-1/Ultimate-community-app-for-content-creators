import { createSlice } from "@reduxjs/toolkit"


export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const initialState = {
    communityData: [],
    communityPosts:[],
    communitySettings: [],
    communityEvents: [],
    
};


const communitySlice = createSlice({
    name: "community",
    initialState ,
    reducers: {
        setCommunity : (state, action) => {
            state.communityData = action.payload
        }
    },

})

export const {setCommunity} = communitySlice.actions
export default communitySlice.reducer


