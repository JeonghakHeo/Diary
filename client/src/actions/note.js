import { GET_NOTES, GET_CURRENT_NOTES, NOTES_ERROR, CREATE_NOTE, CREATE_ERROR, DELETE_NOTE, } from '../actions/types';
import axios from 'axios';

// Get current users notes
export const getCurrentUsersNotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/notes');

    dispatch({
      type: GET_CURRENT_NOTES,
      payload: res.data
    });
  } catch (err) {

    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// export const getNotes = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/notes');

//     dispatch({ type: GET_NOTES, payload: res.data })
//   } catch (err) {
//     dispatch({
//       type: NOTES_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

export const deleteNote = id => async dispatch => {
  try {
    await axios.delete(`/api/notes/${id}`);

    dispatch({ type: DELETE_NOTE, payload: id });

  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createNote = formData => async dispatch => {
  const config = {
    'Content-Type': 'application/json'
  }

  try {
    const res = await axios.post('/api/notes', formData, config);

    dispatch({ type: CREATE_NOTE, payload: res.data })
  } catch (err) {
    dispatch({
      type: CREATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}