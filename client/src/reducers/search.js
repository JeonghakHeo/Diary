import { UPDATE_SEARCH } from '../actions/types'
import { getCurrentUsersNotes } from '../actions/note';

const initialState = {
  searchedNotes: []
};

const search = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SEARCH:
      return {
        ...state,
        searchedNotes: payload
      }

    default:
      return state;
  }
}

export default search