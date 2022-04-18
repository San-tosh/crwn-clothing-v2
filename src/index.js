import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./contexts/user.context";
import {ProductsProvider} from "./contexts/products.context";
import {CartProvider} from "./contexts/cart.context";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <UserProvider>
            <ProductsProvider>
                <CartProvider>
                    <App/>
                </CartProvider>
            </ProductsProvider>
        </UserProvider>
    </BrowserRouter>
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
