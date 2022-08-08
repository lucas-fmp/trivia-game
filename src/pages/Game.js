import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      srcImage: '',
    };
  }

  componentDidMount = () => {
    const { state } = this.props;
    const { player: { gravatarEmail } } = state;
    const convertedEmail = MD5(gravatarEmail).toString();
    const gravatarLink = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({ srcImage: gravatarLink });
  }

  render() {
    const { state } = this.props;
    const { player: { name, score } } = state;
    const { srcImage } = this.state;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="profile" src={ srcImage } />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

Game.propTypes = {
  state: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(Game);
