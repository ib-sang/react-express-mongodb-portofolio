import { createStore, applyMiddleware } from 'redux';
import createSagaMiddle from 'redux-saga';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootSaga from './RootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga)

export default store;