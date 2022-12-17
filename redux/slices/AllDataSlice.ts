import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


const initialState = {
    AllCommunities: [],
    AllPosts: []
}

const AllDataSlice = createSlice({
    name: "AllData",
    initialState,
    reducers: {
        setAllCommunities: (state, action) => {
            state.AllCommunities = action.payload
        },
        setAllPosts : (state, action) => {
            state.AllPosts = action.payload
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log(`----extraReducers is running FROM AllDataSlice---`);
            // console.log(action.payload);

            if(!action.payload.allData.AllCommunities) {
                return state
            }

            state.AllCommunities = action.payload.allData.AllCommunities
            
            
        }
    }
})

export const {setAllCommunities, setAllPosts} = AllDataSlice.actions
export default AllDataSlice.reducer
