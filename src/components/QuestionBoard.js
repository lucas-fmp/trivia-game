import PropTypes from 'prop-types';
import React, { Component } from 'react';

let incorrectIdx = 0;

export default class QuestionBoard extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      randomAnswers: [],
      buttonState: false,
    };
  }

  componentDidMount = () => {
    const { questionInfo } = this.props;
    const { correct_answer: correctAnswer } = questionInfo;
    const answers = [...questionInfo.incorrect_answers, correctAnswer];
    const randomAnswers = this.randomizeAnswers(answers);
    this.setState({ randomAnswers });
    this.countdown();
  }

  createTestId = (answer, correctAnswer) => {
    const testId = answer === correctAnswer
      ? 'correct-answer' : `wrong-answer-${incorrectIdx}`;
    incorrectIdx = answer !== correctAnswer ? incorrectIdx + 1 : incorrectIdx;
    return testId;
  }

  randomizeAnswers = (answers) => {
    const randomNumber = 0.5;
    return answers.sort(() => Math.random() - randomNumber);
  }

  createButtons = (answers, correctAnswer) => {
    const { buttonState } = this.state;
    const { selectAnswer } = this.props;
    return (
      answers
        .map((answer, idx) => (
          <button
            data-testid={ this.createTestId(answer, correctAnswer) }
            key={ idx }
            type="button"
            disabled={ buttonState }
            onClick={ () => selectAnswer(answer) }
          >
            { answer }
          </button>
        ))
    );
  }

  countdown = () => {
    const oneSecondInMiliseconds = 1000;
    const thirtySeconds = 30;
    let count = thirtySeconds;
    const interval = setInterval(() => {
      count -= 1;
      this.setState({ seconds: count }, () => {
        const { seconds } = this.state;
        if (seconds === 0) {
          clearInterval(interval);
          this.setState({ buttonState: true });
        }
      });
    }, oneSecondInMiliseconds);
  }

  componentWillUnmount = () => {
    clearInterval(this.countdown);
  }

  render() {
    const { questionInfo } = this.props;
    const { category, question, correct_answer: correctAnswer } = questionInfo;
    const { seconds, randomAnswers } = this.state;
    return (
      <div>
        <h2
          data-testid="question-category"
        >
          {category}
        </h2>
        <p>{seconds}</p>
        <p
          data-testid="question-text"
        >
          {question}
        </p>
        <div data-testid="answer-options">
          {
            this.createButtons(randomAnswers, correctAnswer)
          }
        </div>
      </div>
    );
  }
}

QuestionBoard.propTypes = {
  questionInfo: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
  }).isRequired,
  selectAnswer: PropTypes.func.isRequired,
};
