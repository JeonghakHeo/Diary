import { GET_NOTE, GET_ALL_NOTES, CLEAR_NOTE, NOTES_ERROR, EDIT_NOTE, CREATE_NOTE, CREATE_ERROR, DELETE_NOTE, MAKE_FAVORITE, MAKE_UNFAVORITE } from '../actions/types';

const initialState = {
  notes: [],
  note: null,
  loading: false,
  error: {}
};

const note = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case GET_NOTE:
      return {
        ...state,
        notes: [],
        note: payload,
        loading: false
      }
    case EDIT_NOTE:
      return {
        ...state,
        note: payload,
        loading: true
      }
    case GET_ALL_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false
      }

    case CLEAR_NOTE:
      return {
        ...state,
        note: null,
        loading: true
      }
    case CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, payload],
        loading: false
      }

    case NOTES_ERROR:
    case CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      }

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== payload),
        loading: false
      }
    case MAKE_FAVORITE:
    case MAKE_UNFAVORITE:
      return {
        ...state,
        notes: state.notes.map(note => note._id === payload.id ? { ...note, favorite: payload.favorite } : note),
        loading: false
      }
    default: {
      return state
    }
  }
}

export default note