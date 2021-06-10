// rootReducer
import { combineReducers } from 'redux';
import search from './search';
import auth from './auth';
import note from './note';
import error from './error';
import snackbar from './snackbar';

export default combineReducers({
  search,
  auth,
  note,
  error,
  snackbar
});