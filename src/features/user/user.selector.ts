import {createSelector} from "reselect";
import {UserState} from "./userSlice";
import {RootState} from "../../store/store";

export const selectUserReducer = (state: RootState): UserState =>  state.user;
export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser
)