import { configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {rootReducer} from "./root-reducer"; // defaults to localStorage for web
// import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./root-saga";
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

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] // it comes from authenticaiton to listener so not to conflict each other we blacklisted use
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean); //if false return empty

const store =  configureStore({
    reducer: persistedReducer,
    middleware: middleWares,
    devTools: process.env.NODE_ENV !== 'production',
    // undefined,
    // composedEnhancers
})

export default store

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)