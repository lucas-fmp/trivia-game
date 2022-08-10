import React from "react";
import App from "../App";
import userEvent from '@testing-library/user-event'
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testing the Login Page', () => {
    it('Should test if the inputs are in Page', () => {
      renderWithRouterAndRedux(<App />);
      const inputName = screen.getByTestId('input-player-name')
      const inputEmail = screen.getByTestId('input-gravatar-email')
      expect(inputEmail).toBeInTheDocument()
      expect(inputName).toBeInTheDocument()
    })
    it('Should simulate a login', () => {
      renderWithRouterAndRedux(<App />);
      const inputName = screen.getByTestId('input-player-name')
      const inputEmail = screen.getByTestId('input-gravatar-email')
      userEvent.type(inputName, 'user');
      userEvent.type(inputEmail, 'user@user.com');
      expect(inputName).toHaveAttribute('value', 'user');
      expect(inputEmail).toHaveAttribute('value', 'user@user.com');
    })
    it('Should test the Settings button', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const settingsBtn = screen.getByTestId("btn-settings");
      userEvent.click(settingsBtn);
      const { location: { pathname } }= history;
      expect(pathname).toBe('/settings');
    })
    it('Should test the Play button', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const inputName = screen.getByTestId('input-player-name')
      const inputEmail = screen.getByTestId('input-gravatar-email')
      const playBtn = screen.getByTestId("btn-play");
      userEvent.type(inputName, 'user');
      userEvent.type(inputEmail, 'user@user.com');
      userEvent.click(playBtn);
      const questionCategory = await screen.findByTestId('header-profile-picture');
      expect(questionCategory).toBeInTheDocument();
    })
})