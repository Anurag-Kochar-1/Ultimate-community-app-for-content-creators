import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginModalOpen: false
}

const modalSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        setIsLoginModalOpen: (state, action) => {
            state.isLoginModalOpen = action.payload
        },
        
    }
})

export const { setIsLoginModalOpen } = modalSlice.actions
export default modalSlice.reducer