// we know we have three types of button
// default
// inverted
// google sign in
import {ButtonHTMLAttributes, FC} from "react";
import {BaseButton, GoogleSignInButton, InvertedButton, LoadingSpinner} from "./button.styles";

export enum BUTTON_TYPE_CLASSES  {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted'
}

const getButton = (buttonType : string = BUTTON_TYPE_CLASSES.base) => ({ // using map object
    [BUTTON_TYPE_CLASSES.base]:BaseButton,
    [BUTTON_TYPE_CLASSES.google]:GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]:InvertedButton
}[buttonType]);

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: Boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;


const Button : FC<ButtonProps> = ({
                                      children,
                                      buttonType,
                                      isLoading = false,
                                          ...otherProps
    })=>{
    const CustomButton = getButton(buttonType)
    return (
        // @ts-ignore
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <LoadingSpinner /> : children}
        </CustomButton>
    )
}

export default Button;