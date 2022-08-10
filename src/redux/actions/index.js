import { USER_LOGIN, INCREMENT_SCORE, INCREMENT_ASSERTIONS, USER_TOKEN } from './actionTypes';

export const login = (state) => ({ type: USER_LOGIN, state });

export const incrementScore = (score) => ({ type: INCREMENT_SCORE, score });

export const incrementAssertions = () => ({ type: INCREMENT_ASSERTIONS });

export const user_token = (state) => ({ type: USER_TOKEN, state });
