import {USER_ACTION_TYPES} from "./user.types";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword, signOutUser,
    signWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {signInFailed, signInSuccess, signOutSuccess} from "./userSlice";
import {signOutFailed,signUpFailed, signUpSuccess} from "./user.action";

export function* getSnapShotFromUserAuth(userAuth, additionalDetails)
{
    try{
        // fn, arguments in call
        const userSnapShot =  yield call(createUserDocumentFromAuth, userAuth ,additionalDetails);
        console.log('userSnapShot',userSnapShot);
        // console.log('userSnapShot',userSnapShot.data());
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot}))
        // console.log(userSnapShot);
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapShotFromUserAuth,userAuth)
    } catch(error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle() {
    try{
        const {user} = yield call(signWithGooglePopup);
        yield call(getSnapShotFromUserAuth,user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signWithEmailAndPassword({payload: { email, password }}) {
    try{
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapShotFromUserAuth,user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signUp({payload: { email, password, displayName }}) {
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user,{displayName}))
    } catch (error) {
        yield put(signUpFailed(error))
    }
}

export function* signInAfterSignUp({payload: { user, additionalDetails}}) {
    try{
        yield call(getSnapShotFromUserAuth,user, additionalDetails)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signOut() {
    try{
        yield call(signOutUser);
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

export function * watchSignWithGoogle() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* watchSignWithEmail() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signWithEmailAndPassword)
}

export function* watchSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* watchSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS,signInAfterSignUp)
}

export function* watchSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOut)
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(watchSignWithGoogle),
        call(watchSignWithEmail),
        call(watchSignUpStart),
        call(watchSignUpSuccess),
        call(watchSignOutStart),
    ]);
}