import { combineReducers } from 'redux';
import candidatesReducer from './candidatesReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  isLoading: loadingReducer,
  candidates: candidatesReducer,
});
