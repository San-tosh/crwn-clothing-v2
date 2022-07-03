import {ChangeEvent, FormEvent, useState} from "react";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss'
import Button from "../button/button.component";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../features/user/user.action";
import {AuthError,AuthErrorCodes} from 'firebase/auth'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    // const {setCurrentUser} = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            // const {user} = await createAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);
            // await createUserDocumentFromAuth(user,{
            //     displayName
            // })
            dispatch(signUpStart(email,password,displayName));
            resetFormFields()
        } catch (e) {
            if((e as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use');
            }
            console.log('user creation encountered error',(e as AuthError).message);
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name'
                           type='text'
                           required
                           onChange={handleChange}
                           name='displayName'
                           value={displayName}
                />

                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' type='password' onChange={handleChange} name='password' value={password} required/>

                <FormInput label='Confirm Password' type='password' onChange={handleChange} name='confirmPassword' value={confirmPassword} required/>

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm