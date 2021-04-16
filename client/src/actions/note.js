import { GET_NOTES, NOTES_ERROR } from '../actions/types';
import axios from 'axios';

export const getNotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/notes');

    dispatch({ type: GET_NOTES, payload: res.data })
  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
