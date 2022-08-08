import PropTypes from 'prop-types';
import React, { Component } from 'react';

let incorrectIdx = 0;

export default class QuestionBoard extends Component {
  createTestId = (answer, correctAnswer) => {
    const testId = answer === correctAnswer
      ? 'correct-answer' : `wrong-answer-${incorrectIdx}`;
    incorrectIdx = answer !== correctAnswer ? incorrectIdx += 1 : incorrectIdx;
    return testId;
  }

  createButtons = (answers, correctAnswer) => {
    const randomNumber = 0.5;
    return (
      answers
        .sort(() => Math.random() - randomNumber)
        .map((answer, idx) => (
          <button
            data-testid={ this.createTestId(answer, correctAnswer) }
            key={ idx }
            type="button"
          >
            { answer }
          </button>
        ))
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
