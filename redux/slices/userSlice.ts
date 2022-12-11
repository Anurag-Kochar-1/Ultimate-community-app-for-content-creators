import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUserData: [],
    joinedCommunitiesData: [],
    ownedCommunitiesData: [],
    createdPostsData: []
    
};

const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        setUser:  (state, action) => {
            state.currentUserData = action.payload
        },
        removerUser: (state) => {
            state.currentUserData = initialState.currentUserData
        },


        setUserJoinedCommunitiesData: (state,action) => {
            state.joinedCommunitiesData = action.payload
        },

        removeUserJoinedCommunitiesData: (state) => {
            state.joinedCommunitiesData = initialState.joinedCommunitiesData
        },



        setUserOwnedCommunitiesData: (state,action) => {
            state.ownedCommunitiesData = action.payload
        },

        removeUserOwnedCommunitiesData: (state) => {
            state.ownedCommunitiesData = initialState.ownedCommunitiesData
        },


        setUserCreatedPostsData: (state,action) => {
            state.createdPostsData = action.payload
        },
        removeUserCreatedPostsData: (state,action) => {
            state.createdPostsData = initialState.createdPostsData
        },



    }
})


export const {setUser, 
    removerUser,
    setUserJoinedCommunitiesData,
    removeUserJoinedCommunitiesData,
    setUserOwnedCommunitiesData,
    removeUserOwnedCommunitiesData,
    setUserCreatedPostsData,
    removeUserCreatedPostsData

} = userSlice.actions
export default userSlice.reducer