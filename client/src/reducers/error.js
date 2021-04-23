import { REMOVE_ERROR, SET_ERROR } from "../actions/types";

const initialState = [];

const setError = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR:
      return [...state, payload]
    case REMOVE_ERROR:
      return state.filter(error => error.id !== payload);
    default:
      return state;
  }
}

export default setError
