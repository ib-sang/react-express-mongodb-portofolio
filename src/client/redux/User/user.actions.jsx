import UserTypes from './user.types';



export const emailSignInStart = userCredentials =>({
    type: UserTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
})

export const signInSuccess = user =>({
    type: UserTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const checkUserSession = () =>({
    type: UserTypes.CHECK_USER_SESSION
})

export const signOutUserStart = () =>({
    type: UserTypes.SIGN_OUT_USER_START
})

export const signOutUserSuccess = ()=>({
    type: UserTypes.SIGN_OUT_USER_SUCCESS
})

export const signUpUserStart = userCredentials =>({
    type: UserTypes.SIGN_UP_USER_START,
    payload: userCredentials
})

export const userError = err => ({
    type: UserTypes.USER_ERROR,
    payload: err
})