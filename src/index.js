import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./contexts/cart.context";
import {Provider} from "react-redux";
import store from "./store/store";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
                    {/*<CartProvider>*/}
                        <App/>
                    {/*</CartProvider>*/}
        </BrowserRouter>
    </Provider>
);
//any of the components inside user provider will have access to user context
//products provider will have access to user data

// <BrowserRouter/>
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
