import './cart-item.styes.scss'
import {CartItem as CartItems} from "../../features/cart/cart.types";
import {FC, memo} from "react";

export type Cart =  {
    cartItem: CartItems
}
const CartItem: FC<Cart> = memo(({cartItem} : Cart)=> {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </div>
        </div>
    )
})

export default CartItem