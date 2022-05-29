import { Outlet} from "react-router-dom";
import {Fragment} from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import {CartContext} from "../../contexts/cart.context";
import {LogoContainer, NavigationContainer, NavLink, NavLinkContainer} from "./navigation.styles";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/user/user.selector";
import {selectIsCartOpen} from "../../features/cart/cart.selector";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinkContainer>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink> :
                            (<NavLink to='/auth'>SIGN IN</NavLink>)
                    }
                    <CartIcon/>
                </NavLinkContainer>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}
// fragment does not render the element like similar to template
export default Navigation