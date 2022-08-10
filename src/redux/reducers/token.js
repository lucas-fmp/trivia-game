import {
  USER_TOKEN,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_TOKEN:
      return ({
        ...state,
        token: action.state,
      })
    default:
      return state;
  }
};

export default token;
