import {createSlice} from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
        },
        signInFailed: (state, action) => {
            state.error = action.payload
        },
        SIGN_OUT_FAILED: (state, action) => {
            state.error = action.payload
        },
        SIGN_UP_FAILED: (state, action) => {
            state.error = action.payload
        },
        signOutSuccess: (state, action) => {
            state.currentUser = null
        },
        setCurrentUser: (state,action) =>{
            state.currentUser = action.payload
        }
    }
})

export const { setCurrentUser } = userSlice.actions
export const { signInSuccess } = userSlice.actions
export const { signInFailed } = userSlice.actions
export const { signOutSuccess } = userSlice.actions

export default userSlice.reducer