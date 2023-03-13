import { combineReducers } from 'redux';
import HomeReducer from './Homereducer';
import AuthReducer from './AuthReducer';
import PartnerReducer from './PartnerReducer';
import { types } from '../action/ActionType';

const appReducer = combineReducers({
  homeReducer: HomeReducer,
  authReducer: AuthReducer,
  partnerReducer: PartnerReducer,

});

//to reset redux
const rootReducers = (state, action) => {
  if (action.type === types.CLEAR_REDUCER) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}
export default rootReducers