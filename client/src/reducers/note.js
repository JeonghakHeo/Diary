import { GET_NOTES, NOTES_ERROR } from '../actions/types';

const initialState = {
  notes: [],
  note: null,
  loading: false,
  error: {}
};

const note = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false
      }

    case NOTES_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload
      }
    }

    default: {
      return state
    }
  }
}

export default note