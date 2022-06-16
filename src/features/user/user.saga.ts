import {USER_ACTION_TYPES} from "./user.types";
import {
    AdditionalInformation,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword, signOutUser,
    signWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import {all, call, put, takeLatest} from "typed-redux-saga/macro";
import {signInFailed} from "./userSlice";
import {
    EmailSignInStart, signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    SignUpStart,
    SignUpSuccess,
    signUpSuccess
} from "./user.action";
import {User} from "firebase/auth";

export function* getSnapShotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation)
{
    try{
        // fn, arguments in call
        const userSnapShot =  yield* call(createUserDocumentFromAuth, userAuth ,additionalDetails);
        console.log('userSnapShot',userSnapShot);
        // console.log('userSnapShot',userSnapShot.data());
        if(userSnapShot) {
            yield* put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))
        }
        // console.log(userSnapShot);
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) return;
        yield* call(getSnapShotFromUserAuth,userAuth)
    } catch(error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithGoogle() {
    try{
        const {user} = yield* call(signWithGooglePopup);
        yield* call(getSnapShotFromUserAuth,user)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signWithEmailAndPassword({payload: { email, password }} : EmailSignInStart) {
    try{
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const {user} = userCredential;
            yield* call(getSnapShotFromUserAuth,user)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signUp({payload: { email, password, displayName }} : SignUpStart) {
    try{
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const {user} = userCredential;
            yield* put(signUpSuccess(user,{displayName}))
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* signInAfterSignUp({payload: { user, additionalDetails}} : SignUpSuccess) {
    try{
        yield* call(getSnapShotFromUserAuth,user, additionalDetails)
    } catch (error) {
        yield* put(signInFailed(error))
    }
}

export function* signOut() {
    try{
        yield* call(signOutUser);
        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function * watchSignWithGoogle() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* watchSignWithEmail() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signWithEmailAndPassword)
}

export function* watchSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* watchSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS,signInAfterSignUp)
}

export function* watchSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOut)
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(watchSignWithGoogle),
        call(watchSignWithEmail),
        call(watchSignUpStart),
        call(watchSignUpSuccess),
        call(watchSignOutStart),
    ]);
}