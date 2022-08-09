import { USER_LOGIN, INCREMENT_SCORE } from './actionTypes';

export const login = (state) => ({ type: USER_LOGIN, state });

export const incrementScore = (score) => ({ type: INCREMENT_SCORE, score });
