// rootReducer
import { combineReducers } from 'redux';
import search from './search';
import auth from './auth';
import note from './note';

export default combineReducers({
  search,
  auth,
  note
});