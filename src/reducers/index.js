import { combineReducers } from 'redux';
import candidatesReducer from './candidatesReducer';

export default combineReducers({
  candidates: candidatesReducer,
});
