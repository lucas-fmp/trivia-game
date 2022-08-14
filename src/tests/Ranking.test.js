import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const MockedPlayer = {
  player: {
    name: 'user',
    assertions: 0,
    score: 0,
    gravatarEmail: 'user@user.com',
  }
}

const path = '/ranking'

describe('Test the Ranking Page', () => {
  it('Should test the title of Ranking Page', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />, MockedPlayer, path);
    const expectedTitle = getByTestId('ranking-title');
    expect(expectedTitle).toBeInTheDocument();
  })

  it('Should test the button that redirect to Home Page', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<App />, MockedPlayer, path);
    const expectedBtn = getByTestId('btn-go-home');
    expect(expectedBtn).toBeInTheDocument()
    userEvent.click(expectedBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/')
  })

  it('Should test if the player mocked is on screen', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />, MockedPlayer, path);
    const playerName = getByTestId('player-name-0');
    expect(playerName).toHaveTextContent('user');
  })
})