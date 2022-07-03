import {ChangeEvent, FormEvent, useState} from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss'
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../features/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    // const {setCurrentUser} = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email,password))
             // await signInAuthUserWithEmailAndPassword(email,password);
            // setCurrentUser(user);
            resetFormFields()
        } catch (e :any) {
            switch(e.code){
                case 'auth/wrong-password':
                    alert('Incorrect password for email.');
                break;

                case 'auth/user-not-found':
                alert('Password or email not correct');
                break;

                default:
                console.log('user creation encountered error',e.message);
            }
        }
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
        // await signWithGooglePopup();
        // await createUserDocumentFromAuth(user);
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' type='password' onChange={handleChange} name='password' value={password} required/>
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm