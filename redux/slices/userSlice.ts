import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUserData: [],
    joinedSubredditsData: [],
    ownedSubredditsData: [],
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


        setUserJoinedSubbreditData: (state,action) => {
            state.joinedSubredditsData = action.payload
        },

        removeUserJoinedSubbreditData: (state) => {
            state.joinedSubredditsData = initialState.joinedSubredditsData
        },



        setUserOwnedSubbreditData: (state,action) => {
            state.ownedSubredditsData = action.payload
        },

        removeUserOwnedSubbreditData: (state) => {
            state.ownedSubredditsData = initialState.ownedSubredditsData
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
    setUserJoinedSubbreditData,
    removeUserJoinedSubbreditData,
    setUserOwnedSubbreditData,
    removeUserOwnedSubbreditData,
    setUserCreatedPostsData,
    removeUserCreatedPostsData

} = userSlice.actions
export default userSlice.reducer