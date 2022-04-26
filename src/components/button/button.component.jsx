// we know we have three types of button
// default
// inverted
// google sign in
import './button.styles'
import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({ // using map object
    [BUTTON_TYPE_CLASSES.base]:BaseButton,
    [BUTTON_TYPE_CLASSES.google]:GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]:InvertedButton
}[buttonType]);

const Button = ({children, buttonType, ...otherProps})=>{
    const CustomButton = getButton(buttonType)
    return <CustomButton {...otherProps}>{children}</CustomButton>
}

export default Button;