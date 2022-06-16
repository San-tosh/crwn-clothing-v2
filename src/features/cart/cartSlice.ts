import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {CartItem} from "./cart.types";

export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItem[],
}

export const CART_INITIAL_STATE : CartState = {
    isCartOpen: false,
    cartItems: [],
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        setIsCartOpen: (state : CartState,action : AnyAction) =>{
            state.isCartOpen = action.payload
        },
        setCartItems: (state : CartState,action : AnyAction) =>{
            state.cartItems = action.payload
        },
        deleteItemFromCart: (state: CartState, action : AnyAction) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { setIsCartOpen } = cartSlice.actions
export const { setCartItems } = cartSlice.actions
export const { deleteItemFromCart } = cartSlice.actions

export default cartSlice.reducer