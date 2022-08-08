import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionBoard from '../components/QuestionBoard';
import fetchQuestions from '../services/fetchApi';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: undefined,
      questionIdx: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
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

  render() {
    const { questions, questionIdx } = this.state;
    return (
      <div>
        <Header />
        <main>
          Trivia
          {
            questions && <QuestionBoard questionInfo={ questions.results[questionIdx] } />
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
};

export default Game;
