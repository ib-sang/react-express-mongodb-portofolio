import { all, call } from 'redux-saga/effects';

// Redux items
import userSaga from './User/user.sagas';

export default function* rootSaga(){
    yield all([
        call(userSaga)
    ])
}