import {USER_ACTION_TYPES} from "./user.types";
import {Action, ActionWithPayload, createAction} from "../../utils/reducer/reducer.util";
import {AdditionalInformation, UserData} from "../../utils/firebase/firebase.utils";
import {User} from "firebase/auth";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string;}>

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, {email: string, password: string, displayName: string;}>

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user: User, additionalDetails: AdditionalInformation;}>

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILURE, Error>;

export const checkUserSession = () :CheckUserSession =>
    createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () : GoogleSignInStart =>
    createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email: string,password: string) : EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password });

export const signUpStart = (email: string,password: string,displayName: string) : SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password, displayName });

export const signUpSuccess = (user: User, additionalDetails: AdditionalInformation) : SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS,{user, additionalDetails});

export const signUpFailed = (error: Error) : SignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () : SignOutStart =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () : SignOutSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error: Error) : SignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export const signInSuccess = (user: UserData & { id: string }): SignInSuccess =>
        createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

