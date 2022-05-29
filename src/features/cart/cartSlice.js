import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isCartOpen: false,
        cartItems: [],
        // cartCount: 0,
        // cartTotal: 0,
    },
    reducers: {
        setIsCartOpen: (state,action) =>{
            state.isCartOpen = action.payload
        },
        setCartItems: (state,action) =>{
            state.cartItems = action.payload
        },
        deleteItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { setIsCartOpen } = cartSlice.actions
export const { setCartItems } = cartSlice.actions
export const { deleteItemFromCart } = cartSlice.actions

export default cartSlice.reducer