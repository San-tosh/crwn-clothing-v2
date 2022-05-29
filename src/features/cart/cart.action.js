export const addCartItem = (cartItems, productToAdd) => {
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

export const removeCartItem = (cartItems, cartItemToRemove) => {
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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems,cartItemToRemove);
    // dispatch(setCartItems(newCartItems));
}

