import { configureStore} from "@reduxjs/toolkit";
// import {logger} from "redux-logger";
import userReducer from "../features/user/userSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import cartReducer from "../features/cart/cartSlice";

// const middlewares = [logger];
// const composedEnhancers = compose(applyMiddleware(...middlewares));
//currying is function that returns another function
// we can use curry func to crate bunch of different functions
//custom middleware
const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action)
    }
    console.log('type: ',action.type);
    console.log('payload: ',action.payload);
    console.log('currentState: ',store.getState());
    next(action); // it is synchronous which is passed to its subsequent middlewares and reducers
    console.log('next state: ', store.getState()); // it gets new state
}
export default configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        cart: cartReducer
    },
    middleware: [loggerMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
    // undefined,
    // composedEnhancers
})