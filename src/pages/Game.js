import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import QuestionBoard from '../components/QuestionBoard';
import fetchQuestions from '../services/fetchApi';
import ButtonNext from '../components/ButtonNext';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: undefined,
      questionIdx: 0,
      srcImage: '',
      selectedAnswer: null,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.setGravatarSrc();
  }

  getToken = () => localStorage.getItem('token');

  getQuestions = async () => {
    const token = this.getToken();
    const questions = await fetchQuestions(token);
    this.verifyInvalidToken(questions);
    this.setState({ questions });
  }

  verifyInvalidToken = ({ response_code: responseCode }) => {
    const { history } = this.props;
    const errorCode = 3;
    if (responseCode === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  setGravatarSrc = () => {
    const { state } = this.props;
    const { player: { gravatarEmail } } = state;
    const convertedEmail = MD5(gravatarEmail).toString();
    const gravatarLink = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({ srcImage: gravatarLink });
  }

  selectAnswer = (selectedAnswer) => this.setState({ selectedAnswer })

  getNextQuestion = () => this.setState((prev) => ({ questionIdx: prev.questionIdx + 1 }))

  render() {
    const { state } = this.props;
    const { player: { name, score } } = state;
    const { srcImage, questions, questionIdx, selectedAnswer } = this.state;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" alt="profile" src={ srcImage } />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        <main>
          Trivia
          {
            questions && <QuestionBoard
              questionInfo={ questions.results[questionIdx] }
              selectAnswer={ this.selectAnswer }
            />
          }
          {
            selectedAnswer && <ButtonNext
              getNextQuestion={ this.getNextQuestion }
            />
          }
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  state: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(Game);
