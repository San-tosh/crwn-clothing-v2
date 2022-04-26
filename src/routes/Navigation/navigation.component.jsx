import { Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// import './navigation.styles.scss'
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";
import {LogoContainer, NavigationContainer, NavLink, NavLinkContainer} from "./navigation.styles";
// import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    // const signOutHandler = async () => {
    //     await signOutUser();
        // setCurrentUser(null)
    // }
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