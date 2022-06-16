import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {UserData} from "../../utils/firebase/firebase.utils";

export type UserState = {
    currentUser: UserData | null;
    isLoading: boolean;
    error: Error | null;
}

export const USER_INITIAL_STATE : UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: USER_INITIAL_STATE,
    reducers: {
        SIGN_IN_SUCCESS: (state: UserState,action : AnyAction) => {
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
        SIGN_OUT_SUCCESS: (state, action) => {
            state.currentUser = null
        },
        setCurrentUser: (state,action) =>{
            state.currentUser = action.payload
        }
    }
})

export const { setCurrentUser } = userSlice.actions
export const { SIGN_IN_SUCCESS } = userSlice.actions
export const { signInFailed } = userSlice.actions
export const { SIGN_OUT_SUCCESS } = userSlice.actions

export default userSlice.reducer