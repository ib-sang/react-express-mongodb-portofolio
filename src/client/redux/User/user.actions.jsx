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