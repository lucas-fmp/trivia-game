import React from "react";
import { screen } from '@testing-library/react'
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event'

describe('The Game page', () => {
    it('contain the Header fields', async () => {
      renderWithRouterAndRedux(<App />);
      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const playButton = screen.getByTestId('btn-play');
      userEvent.type(inputName, 'lucas');
      userEvent.type(inputEmail, 'lucas@gmail.com');
      userEvent.click(playButton);
      const score = await screen.findByTestId('header-score');
      expect(score).toBeInTheDocument();
    })

    it('contain a next question button', async () => {
      renderWithRouterAndRedux(<App />);
      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const playButton = screen.getByTestId('btn-play');
      userEvent.type(inputName, 'lucas');
      userEvent.type(inputEmail, 'lucas@gmail.com');
      userEvent.click(playButton);

      const correctAnswer = await screen.findByTestId('correct-answer');
      expect(correctAnswer).toBeInTheDocument();
      userEvent.click(correctAnswer);

      const nextBtn = screen.getByTestId('btn-next');
      expect(nextBtn).toBeInTheDocument();
      userEvent.click(nextBtn);
      userEvent.click(nextBtn);
      userEvent.click(nextBtn);
      userEvent.click(nextBtn);
      userEvent.click(nextBtn);

      const headerScore = screen.getByTestId('header-score');
      expect(headerScore).toBeInTheDocument();
    })
})