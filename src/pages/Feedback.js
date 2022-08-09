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
      </div>
    );
  }
}

Feedback.propTypes = {
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
