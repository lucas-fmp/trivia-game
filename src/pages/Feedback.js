import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import FeedbackBoard from '../components/FeedbackBoard';
import FeedbackText from '../components/FeedbackText';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      url: '',
      name: '',
      score: 0,
    });
  }

  componentDidMount = async () => {
    const { logindata } = this.props;
    console.log(logindata);
    const { gravatarEmail } = logindata;
    const convertedEmail = md5(gravatarEmail).toString();
    const gravatarLink = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({
      url: gravatarLink,
      name: logindata.name,
      score: logindata.score,
    });
  }

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { url, name, score } = this.state;
    return (
      <div>
        <header>
          <img alt="profile" src={ url } data-testid="header-profile-picture" />
          <h3 data-testid="header-score">{score}</h3>
          <h2 data-testid="header-player-name">{name}</h2>
        </header>
        <FeedbackText />
        <FeedbackBoard />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToHome }
        >
          Jogar Novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  logindata: PropTypes.shape({
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  logindata: state.player,
});

export default connect(mapStateToProps, null)(Feedback);
