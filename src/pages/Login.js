import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../services/fetchApi';
import { login } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonState: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateLoginButton);
  }

  validateLoginButton = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ buttonState: false });
    } else {
      this.setState({ buttonState: true });
    }
  }

  redirect = () => {
    const { history } = this.props;
    history.push('/game');
  }

  saveToken = async () => {
    const token = await fetchToken();
    localStorage.setItem('token', token.token);
    this.redirect();
  }

  render() {
    const { name, email, buttonState } = this.state;
    const { login: loginAction } = this.props;
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
          disabled={ buttonState }
          onClick={ () => {
            loginAction(this.state);
            this.saveToken();
          } }
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
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(login(state)),
});

export default connect(null, mapDispatchToProps)(Login);
