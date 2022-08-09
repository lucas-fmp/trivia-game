import { USER_LOGIN, INCREMENT_SCORE, INCREMENT_ASSERTIONS } from './actionTypes';

export const login = (state) => ({ type: USER_LOGIN, state });

export const incrementScore = (score) => ({ type: INCREMENT_SCORE, score });

export const incrementAssertions = () => ({ type: INCREMENT_ASSERTIONS });
