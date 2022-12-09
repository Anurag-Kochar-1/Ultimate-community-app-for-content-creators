import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUserData: [],
    joinedSubredditsData: [],
    ownedSubredditsData: []
    
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
        }



    }
})


export const {setUser, 
    removerUser,
    setUserJoinedSubbreditData,
    removeUserJoinedSubbreditData,
    setUserOwnedSubbreditData,
    removeUserOwnedSubbreditData

} = userSlice.actions
export default userSlice.reducer