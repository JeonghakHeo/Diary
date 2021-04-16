import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// register
export const register = ({ name, email, password }) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {

    // TODO: error handle
    const errors = err.response.data.errors;
    console.log(errors);

    dispatch({
      type: REGISTER_FAIL
    })
  }

}