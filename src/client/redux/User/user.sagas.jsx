import { takeLatest, all, call, put } from "redux-saga/effects";
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess } from './user.actions'
import auth from './../../api/auth';
import user from './../../api/users';


export function* getSnapshotFromUserAuth(user, additionalData = {}){

    try {
        yield put(
            signInSuccess({
                ...user.data
            })
        )
    } catch (error) {
        console.log(error)
    }
}

export function* emailSignIn({ payload: {email, password} }){

    try {
        const user = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        console.log(error);
    }
}

export function* onEmailSingInStart(){
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export function* isUserAuthenticated(){

    try {
        const userAuth = yield user.getCurrentUser();
        console.log(userAuth);
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        console.log(error)
    }

}

export function* onCheckUserSession(){
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser(){
    try {
        yield auth.signOut()
        yield put(
            signOutUserSuccess()
        )
    } catch (error) {
        console.log(error);
    }
}

export function* onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({payload:{
    displayName,
    email,
    password,
    confirmPassword
}}){
    if(password !== confirmPassword){
        const error = ["Password don't match"];
        yield put()
        return
    }
    try {
        
        const user = yield auth.createUserWithEmailAndPassword(email, password)
        const additionalData = { displayName }
        yield getSnapshotFromUserAuth(user, additionalData)
        
    } catch (error) {
        console.log(error);
    }
}

export function* onSignUpUserStart(){
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export default function* userSaga(){
    yield all([
        call(onEmailSingInStart),
        call(onCheckUserSession),
        call(onSignOutUserStart)
    ])
}