import './cart-icon.styles'
// import {useContext} from "react";
// import {CartContext} from "../../contexts/cart.context";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectIsCartOpen} from "../../features/cart/cart.selector";
import {setIsCartOpen} from "../../features/cart/cartSlice";

const CartIcon = ()=>{
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)
    const dispatch = useDispatch();

    const toggleCartOpen = () => { // @ts-ignore
        dispatch(setIsCartOpen(!isCartOpen))}

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon