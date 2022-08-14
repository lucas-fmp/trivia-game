import React from "react";
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event';
import { questionsResponse, invalidTokenQuestionsResponse } from '../../cypress/mocks/questions';
import App from "../App";

const MockedPlayer = {
  player: {
    name: 'user',
    assertions: 0,
    score: 0,
    gravatarEmail: 'user@user.com',
  }
};
const path = '/game';

describe('The Game page', () => {
  it('contain the Header fields', () => {
    renderWithRouterAndRedux(<App />, MockedPlayer, path);

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
  });

  it('contain the next question button', async () => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, MockedPlayer, path);

    const firstQuestion = await screen.findByTestId('question-text');
    expect(firstQuestion).toHaveTextContent('The Republic of Malta is the smallest microstate worldwide.');

    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();

    userEvent.click(correctAnswer);

    const buttonNext = screen.getByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument();
    
    const countdown = screen.getByTestId('countdown');
    userEvent.click(buttonNext);
    expect(countdown).toHaveTextContent(30);

    const category = screen.getByTestId('question-category');
    expect(category).toBeInTheDocument();

    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    expect(history.location.pathname).toBe('/feedback');
  });

  it('redirect to the Login page if the fetch fail', async () => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(invalidTokenQuestionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />, MockedPlayer, path);

    expect(history.location.pathname).toBe('/game'); // porque nao só '/' ?
  });
})