import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAssertions, incrementScore } from '../redux/actions';
import './QuestionBoard.css';

let incorrectIdx = 0;
class QuestionBoard extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      randomAnswers: [],
      question: '',
      buttonState: false,
      borderEnable: false,
    };
  }

  componentDidMount = () => {
    this.countdown();
    this.randomizeAnswers();
  }

  countdownReset = (questionInfo) => {
    this.setState({ seconds: 30, question: questionInfo.question });
  }

  componentDidUpdate = () => {
    const { question } = this.state;
    const { questionInfo } = this.props;
    if (question !== questionInfo.question) {
      this.countdownReset(questionInfo);
      this.randomizeAnswers();
    }
  }

  createTestId = (answer, correctAnswer) => {
    const testId = answer === correctAnswer
      ? 'correct-answer' : `wrong-answer-${incorrectIdx}`;
    incorrectIdx = answer !== correctAnswer ? incorrectIdx + 1 : incorrectIdx;
    return testId;
  }

  activeBorder = () => {
    this.setState({
      borderEnable: true,
    });
  }

  createClass = (testId) => {
    const { borderEnable } = this.state;
    const border = borderEnable ? 'border' : '';
    const colorBorder = testId === 'correct-answer' ? 'colorGreen' : 'colorRed';
    return `${border} ${colorBorder}`;
  }

  randomizeAnswers = () => {
    const randomNumber = 0.5;
    const { questionInfo } = this.props;
    const { correct_answer: correctAnswer } = questionInfo;
    const answers = [...questionInfo.incorrect_answers, correctAnswer];
    const randomAnswers = answers.sort(() => Math.random() - randomNumber);
    this.setState({ randomAnswers, question: questionInfo.question });
  }

  incrementScore = (questionInfo, seconds) => {
    const { setScore, setAssertions } = this.props;
    let score = 0;
    const minimumPoints = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const { difficulty } = questionInfo;
    if (difficulty === 'easy') {
      score = minimumPoints + (seconds * easy);
    }
    if (difficulty === 'medium') {
      score = minimumPoints + (seconds * medium);
    }
    if (difficulty === 'hard') {
      score = minimumPoints + (seconds * hard);
    }
    setScore(score);
    setAssertions();
  }

  verifyAnswer = (answer) => {
    const { questionInfo } = this.props;
    const { correct_answer: correctAnswer } = questionInfo;
    if (correctAnswer === answer) {
      const { seconds } = this.state;
      this.incrementScore(questionInfo, seconds);
    }
  }

  createButtons = (answers, correctAnswer) => {
    const { buttonState } = this.state;
    const { selectAnswer } = this.props;
    return (
      answers
        .map((answer, idx) => {
          const testId = this.createTestId(answer, correctAnswer);
          return (
            <button
              data-testid={ testId }
              key={ idx }
              type="button"
              className={ this.createClass(testId) }
              disabled={ buttonState }
              name={ testId }
              onClick={ () => {
                this.activeBorder();
                selectAnswer(answer);
                this.verifyAnswer(answer);
              } }
            >
              { answer }
            </button>
          );
        })
    );
  }

  countdown = () => {
    const oneSecondInMiliseconds = 1000;
    const interval = setInterval(() => {
      const { seconds } = this.state;
      let count = seconds;
      count -= 1;
      this.setState({ seconds: count }, () => {
        if (seconds === 1) {
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
  setScore: PropTypes.func.isRequired,
  setAssertions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(incrementScore(score)),
  setAssertions: () => dispatch(incrementAssertions()),
});

export default connect(null, mapDispatchToProps)(QuestionBoard);
