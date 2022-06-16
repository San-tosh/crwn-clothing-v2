import { configureStore, Middleware} from "@reduxjs/toolkit";
import {logger} from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {rootReducer} from "./root-reducer"; // defaults to localStorage for web
// import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./root-saga";
import {PersistConfig} from "redux-persist";

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] // it comes from authenticaiton to listener so not to conflict each other we blacklisted use
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));
//if false return empty

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