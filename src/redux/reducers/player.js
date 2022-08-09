import { USER_LOGIN, INCREMENT_SCORE } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return ({
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.email,
    });
  case INCREMENT_SCORE:
    return ({
      ...state,
      score: state.score + action.score,
    });
  default:
    return state;
  }
};

export default player;
