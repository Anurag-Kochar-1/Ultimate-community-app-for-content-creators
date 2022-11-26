import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUserData: [],
    
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
        }


    }
})


export const {setUser , removerUser} = userSlice.actions
export default userSlice.reducer