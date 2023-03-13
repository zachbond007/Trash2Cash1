import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import combineReducers from './index';
import { rootSaga } from '../saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from '../../config/reactotronconfig';
import {persistStore, persistReducer} from 'redux-persist';


// Middleware: Redux Saga
const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleware = applyMiddleware(sagaMiddleware);
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const enhancer = compose(middleware, Reactotron.createEnhancer());
const persistedReducer = persistReducer(persistConfig, combineReducers);

export const store = createStore(persistedReducer, enhancer);
// Middleware: Redux Saga


sagaMiddleware.run(rootSaga);






export const persistor =persistStore(store);
