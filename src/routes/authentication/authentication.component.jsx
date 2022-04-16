// import {
//     auth,
//     createUserDocumentFromAuth,
//     signWithGooglePopup,
//     signWithGoogleRedirect
// } from "../../utils/firebase/firebase.utils";
// import {useEffect} from "react";
// import {getRedirectResult} from "firebase/auth"
import SignUpForm from "../../components/sign-up/sign-up.component";
import SignInForm from "../../components/sign-in/sign-in.component";
import './authentication.styles.scss'

const Authentication = () => {

    // useEffect(()=>{
    //     const getRedirectResultVar = getRedirectResult;
    //     async function getRedirectResultAuth(){
    //         const response = await getRedirectResultVar(auth);
    //         if (response) {
    //             await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     getRedirectResultAuth();
    // },[])

    // const logGoogleUser = async () => {
    //     const {user} = await signWithGooglePopup();
    //     await createUserDocumentFromAuth(user);
    // }

    // const logGoogleUserRedirect = async () => {
    //     const {user} = await signWithGoogleRedirect();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    //     console.log(userDocRef)
    // }
    return (
            <div className='authentication-container'>
                {/*<button onClick={logGoogleUser}>*/}
                {/*    Sign in with Google Popup*/}
                {/*</button>*/}
                {/*<button onClick={logGoogleUserRedirect}>*/}
                {/*    Sign in with Google Redirect*/}
                {/*</button>*/}
                <SignInForm/>
                <SignUpForm/>
            </div>
    )
}

export default Authentication