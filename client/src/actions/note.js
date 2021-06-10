import { GET_NOTE, GET_ALL_NOTES, CLEAR_NOTE, NOTES_ERROR, CREATE_NOTE, CREATE_ERROR, DELETE_NOTE, EDIT_NOTE, MAKE_FAVORITE, MAKE_UNFAVORITE, FAVORITE_ERROR } from '../actions/types';
import axios from 'axios';

// Get current users all notes
export const getCurrentUsersNotes = () => async dispatch => {
  dispatch({ type: CLEAR_NOTE })
  try {
    const res = await axios.get('/api/notes');

    dispatch({
      type: GET_ALL_NOTES,
      payload: res.data
    });
  } catch (err) {

    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getNote = id => async dispatch => {
  try {
    const res = await axios.get(`/api/notes/${id}`);

    dispatch({ type: GET_NOTE, payload: res.data })
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
};


// Edit note
export const editNote = (formData, history, id) => async dispatch => {
  dispatch({ type: CLEAR_NOTE });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/notes/${id}`, formData, config);

    dispatch({
      type: EDIT_NOTE,
      payload: res.data
    });

    history.push('/notes')
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      console.log('note.js/action error handle needed')
    }

    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete note
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

// Favorite note
export const makeFavorite = id => async dispatch => {
  try {
    const res = await axios.put(`/api/notes/favorite/${id}`);

    dispatch({ type: MAKE_FAVORITE, payload: { id, favorite: res.data } });
  } catch (err) {
    dispatch({
      type: FAVORITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
};

// Unfavorite note
export const makeUnfavorite = id => async dispatch => {
  try {
    const res = await axios.put(`/api/notes/unfavorite/${id}`);

    dispatch({ type: MAKE_UNFAVORITE, payload: { id, favorite: res.data } });
  } catch (err) {
    dispatch({
      type: FAVORITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}