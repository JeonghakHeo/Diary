import { GET_NOTES, GET_CURRENT_NOTES, NOTES_ERROR, CREATE_NOTE, CREATE_ERROR, DELETE_NOTE } from '../actions/types';

const initialState = {
  notes: [],
  note: null,
  loading: false,
  error: {}
};

const note = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    // case GET_NOTES:
    case GET_CURRENT_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false
      }

    case CREATE_NOTE:
      return {
        ...state,
        notes: [payload, ...state.notes],
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
    default: {
      return state
    }
  }
}

export default note