import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ButtonNext extends Component {
  render() {
    const { getNextQuestion } = this.props;
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ getNextQuestion }
      >
        Next
      </button>
    );
  }
}

ButtonNext.propTypes = {
  getNextQuestion: PropTypes.func.isRequired,
};
