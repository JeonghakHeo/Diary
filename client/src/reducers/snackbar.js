import { SET_SNACKBAR } from '../actions/types'

const initialState = {
  isOpen: false,
  type: "success",
  msg: ""
}

const snackbar = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SNACKBAR: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
}

export default snackbar