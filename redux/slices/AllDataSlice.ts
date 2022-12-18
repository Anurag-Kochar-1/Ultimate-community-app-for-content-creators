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
            console.log(`----extraReducers AllCommunities is running FROM AllDataSlice---`);
            // console.log(action.payload);

            if(!action.payload.allData.AllCommunities) {
                return state
            }
            state.AllCommunities = action.payload.allData.AllCommunities
            
            
        },

        // [HYDRATE]: (state, action) => {
        //     console.log(`----extraReducers AllPosts is running FROM AllDataSlice---`);
        //     // console.log(action.payload);

        //     if(!action.payload.allData.AllPosts) {
        //         return state
        //     }
        //     state.AllPosts = action.payload.allData.AllPosts
            
            
        // }
    }
})

export const {setAllCommunities, setAllPosts} = AllDataSlice.actions
export default AllDataSlice.reducer
