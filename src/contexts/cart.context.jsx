import {createContext, useEffect, useState} from "react";

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

export const CartProvider =  ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // it can be done using useEffect
    useEffect(()=>{ // one useEffect for single responsibility
        setCartCount(cartItems.reduce((sum,cartItem) => {return sum+cartItem.quantity},0));
    },[cartItems])

    useEffect(()=>{ // one useEffect for single responsibility
        setCartTotal(cartItems.reduce((total,cartItem) => {return total+(cartItem.quantity*cartItem.price)},0));
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }

    const deleteItemFromCart = (cartItemToDelete) => {
        setCartItems(cartItems.filter(item => item.id !== cartItemToDelete.id))
    }

    const value = {
        isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart,
        deleteItemFromCart,
        cartTotal
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}