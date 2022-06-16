//currying is function that returns another function
// we can use curry func to crate bunch of different functions
//custom middleware
import {Middleware} from "@reduxjs/toolkit";
import {RootState} from "../store";

const loggerMiddleware : Middleware<{}, RootState> = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action)
    }
    console.log('type: ',action.type);
    console.log('payload: ',action.payload);
    console.log('currentState: ',store.getState());
    next(action); // it is synchronous which is passed to its subsequent middlewares and reducers
    console.log('next state: ', store.getState()); // it gets new state
}