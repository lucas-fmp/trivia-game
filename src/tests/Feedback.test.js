import React from "react";
import { screen } from '@testing-library/react'
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event'

describe('The Feedback page', () => {
  it('contain the Header fields', () => {
    const MockedPlayer = {
      player: {
        name: 'user',
        assertions: 0,
        score: 0,
        gravatarEmail: 'user@user.com',
      }
    };
    
    const path = '/feedback';
    renderWithRouterAndRedux(<App />, MockedPlayer, path);

    const headerScore = screen.getByTestId('header-score');
    expect(headerScore).toBeInTheDocument();
  });

  it('redirect to the main page when the play again button is clicked', () => {
    const MockedPlayer = {
      player: {
        name: 'user',
        assertions: 0,
        score: 0,
        gravatarEmail: 'user@user.com',
      }
    };
    
    const path = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, MockedPlayer, path);

    const playAgainBtn = screen.getByTestId('btn-play-again');
    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('redirect to the ranking page when the ranking button is clicked', () => {
    const MockedPlayer = {
      player: {
        name: 'user',
        assertions: 0,
        score: 0,
        gravatarEmail: 'user@user.com',
      }
    };
    
    const path = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, MockedPlayer, path);

    const rankingBtn = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
  });
});
