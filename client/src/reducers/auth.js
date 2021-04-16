import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types'

const initialState = {
  // token: localStorage.getItem('token'),
  // isAuthenticated: null,
  loading: true,
  user: null
}

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload
      }
    default: return state
  }

}

export default auth
