import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  setGravatarSrc = () => {
    const { state } = this.props;
    const { player: { gravatarEmail } } = state;
    const convertedEmail = MD5(gravatarEmail).toString();
    const gravatarLink = `https://www.gravatar.com/avatar/${convertedEmail}`;
    return gravatarLink;
  }

  render() {
    const { state } = this.props;
    const { player: { name, score } } = state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profile"
          src={ this.setGravatarSrc() }
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

Header.propTypes = {
  state: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(Header);
