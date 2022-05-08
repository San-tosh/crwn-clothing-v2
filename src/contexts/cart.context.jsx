import {createContext, useEffect, useReducer, useState} from "react";
import {createAction} from "../utils/reducer/reducer.util";

export const CartContext = createContext( {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addItemToCart: ()=>{},
        removeItemFromCart: ()=>{},
        deleteItemFromCart: ()=>{},
        cartCount: 0,
        cartTotal: 0,
    }
)
const addCartItem = (cartItems, productToAdd) => {
    // return if product to add exist in cartItems
    const existingCartItem = cartItems.find((cartItem)=> {
        return cartItem.id === productToAdd.id
    });
    // if found increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem)=> {
            return (cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
        })
    }
    return [...cartItems,{...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // return if product to add exist in cartItems
    const existingCartItem = cartItems.find((cartItem)=> {
        return cartItem.id === cartItemToRemove.id
    });

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== cartItemToRemove.id)
    }
    // decrement quantity
    return cartItems.map((cartItem)=> {
           return (cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
    })
}
export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
    ADD_TO_CART: 'ADD_TO_CART',

}

const cartReducer = (state, action) => {
    console.log(state);
    console.log(action);
    const { type, payload} = action;
    console.log('payload',payload)
    switch (type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}


export const CartProvider =  ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(null);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const setIsCartOpen = (isCartOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen))
    }

    const updateCartItemsReducer = (newCartItems)=>
    {
        const newCartCount = newCartItems.reduce((sum,cartItem) => {return sum+cartItem.quantity},0);
        const newCartTotal = newCartItems.reduce((total,cartItem) => {return total+(cartItem.quantity*cartItem.price)},0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                 cartCount: newCartCount
            }));
    }

    // // it can be done using useEffect
    // useEffect(()=>{ // one useEffect for single responsibility
    //     setCartCount(cartItems.reduce((sum,cartItem) => {return sum+cartItem.quantity},0));
    // },[cartItems])
    //
    // useEffect(()=>{ // one useEffect for single responsibility
    //     setCartTotal(cartItems.reduce((total,cartItem) => {return total+(cartItem.quantity*cartItem.price)},0));
    // },[cartItems])

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const deleteItemFromCart = (cartItemToDelete) => {
        const newCartItems = cartItems.filter(item => item.id !== cartItemToDelete.id);
        updateCartItemsReducer(newCartItems);
    }

    const value = {
        isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart,
        deleteItemFromCart,
        cartTotal
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}