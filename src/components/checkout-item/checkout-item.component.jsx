import './checkout-item.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../features/cart/cart.selector";
import {addCartItem, removeCartItem} from "../../features/cart/cart.action";
import {deleteItemFromCart, setCartItems} from "../../features/cart/cartSlice";


const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)

    const addItemToCart = ()=> {
        const newCartItems = addCartItem(cartItems, cartItem);
        dispatch(setCartItems(newCartItems))
    }

    const removeItemFromCart = ()=> {
        const newCartItems = removeCartItem(cartItems, cartItem);
        dispatch(setCartItems(newCartItems))
    }

    const clearItemFromCart = (cartItem)=> {
        dispatch(deleteItemFromCart(cartItem))
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItemFromCart(cartItem)}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItemToCart(cartItem)}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem