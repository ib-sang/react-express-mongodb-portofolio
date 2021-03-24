import { takeLatest, all, call } from "redux-saga/effects";
import userTypes from './user.types'


export function* emailSignIn({ payload: {email, password} }){

    try {
        console.log(payload);
    } catch (error) {
        console.log(error);
    }
}

export function* onEmailSingInStart(){
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export default function* userSaga(){
    yield all([
        call(onEmailSingInStart)
    ])
}