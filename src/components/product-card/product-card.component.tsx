import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import './product-card.styles.scss'
// import {useContext} from "react";
// import {CartContext} from "../../contexts/cart.context";
import {useDispatch, useSelector} from "react-redux";
import {addCartItem} from "../../features/cart/cart.action";
import {setCartItems} from "../../features/cart/cartSlice";
import {selectCartItems} from "../../features/cart/cart.selector";
import {CategoryItem} from "../../features/categories/categories.types";

export type ProductCardProps = {
    product: CategoryItem
}
const ProductCard = ({product} : ProductCardProps)=>{
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const {name, price, imageUrl} = product;

    const addProductToCart = ()=> {
        const newCartItems = addCartItem(cartItems, product);
        // @ts-ignore
        dispatch(setCartItems(newCartItems))
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add To Cart</Button>
        </div>
    )
}

export default ProductCard