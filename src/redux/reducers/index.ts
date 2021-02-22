import { combineReducers } from 'redux';
import userinfoReducer from './userinfo';
import paramReducer from './param';
export default combineReducers({
    userinfo: userinfoReducer,
    param: paramReducer,
});
