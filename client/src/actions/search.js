import { UPDATE_SEARCH } from './types';

export const search = (newNotes) => async dispatch => {

  dispatch({
    type: UPDATE_SEARCH,
    payload: newNotes
  })
}