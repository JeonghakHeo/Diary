import { SET_SNACKBAR } from './types';

const snackbar = (isOpen, type, msg) => dispatch => {
  dispatch({
    type: SET_SNACKBAR,
    payload: { isOpen, type, msg }
  })
}

export default snackbar