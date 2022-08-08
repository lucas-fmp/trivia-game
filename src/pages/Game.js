import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionBoard from '../components/QuestionBoard';
import fetchQuestions from '../services/fetchApi';
import ButtonNext from '../components/ButtonNext';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: undefined,
      questionIdx: 0,
      selectedAnswer: null,
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

  selectAnswer = (selectedAnswer) => this.setState({ selectedAnswer })

  getNextQuestion = () => this.setState((prev) => ({ questionIdx: prev.questionIdx + 1 }))

  render() {
    const { questions, questionIdx, selectedAnswer } = this.state;
    return (
      <div>
        <Header />
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
};

export default Game;
