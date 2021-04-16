import { UPDATE_SEARCH } from './types';

export const search = () => dispatch => {
  dispatch({ type: UPDATE_SEARCH })
}