import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './QuestionBoard.css'

let incorrectIdx = 0;

export default class QuestionBoard extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      borderEnable: false,
    })

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
    })
  }

  createClass = (testId) => {
    const { borderEnable } = this.state
    const border = borderEnable ? 'border' : '';
    const colorBorder = testId === 'correct-answer' ? 'colorGreen' : 'colorRed';
    return border + ' ' + colorBorder;
  }

  createButtons = (answers, correctAnswer) => {
    const randomNumber = 0.5;
    return (
      answers
        .sort(() => Math.random() - randomNumber)
        .map((answer, idx) => {
          const testId = this.createTestId(answer, correctAnswer)
          return (
            <button
              data-testid={ testId }
              key={ idx }
              type="button"
              className={this.createClass(testId)}
              name={ testId }
              onClick={this.activeBorder}
            >
              { answer }
            </button>
        )})
    );
  }

  render() {
    const { questionInfo } = this.props;
    const { category, question, correct_answer: correctAnswer } = questionInfo;
    const answers = [...questionInfo.incorrect_answers, correctAnswer];
    return (
      <div>
        <h2
          data-testid="question-category"
        >
          {category}
        </h2>
        <p
          data-testid="question-text"
        >
          {question}
        </p>
        <div data-testid="answer-options">
          {
            this.createButtons(answers, correctAnswer)
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
};
