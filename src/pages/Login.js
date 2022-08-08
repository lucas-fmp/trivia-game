import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { fetchToken } from '../services/fetchApi';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  validateLoginButton = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return false;
    }
    return true;
  }

  saveToken = async () => {
    const { history } = this.props;
    const token = await fetchToken();
    localStorage.setItem('token', token.token);
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <form>
        <input
          type="text"
          placeholder="Insira seu nome"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          name="name"
          value={ name }
        />
        <input
          type="email"
          placeholder="Insira seu email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          name="email"
          value={ email }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.validateLoginButton() }
          onClick={ this.saveToken }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
