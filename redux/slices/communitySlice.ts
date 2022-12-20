import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from 'next-redux-wrapper';
import { useSelector } from "react-redux";
// import { AppState } from "../store";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const initialState = {
    allCommunitiesData: [],
    communityData: [],
    communityPosts:[],
    communitySettings: [],
    communityEvents: [],
    communityTextChannels: [],
    
};


const communitySlice = createSlice({
    name: "community",
    initialState ,
    reducers: {
        setCommunity : (state, action) => {
            state.communityData = action?.payload
        },

        setAllCommunities : (state, action) => {
            state.allCommunitiesData = action.payload
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            // console.log(`----extraReducers is running - HYDRATE---`);
            // console.log(action.payload);

            if(!action.payload.community.communityData) {
                return state
            }

            state.communityData = action.payload.community.communityData
            
            
        }
    }

})

export const {setCommunity, setAllCommunities} = communitySlice.actions
export default communitySlice.reducer

