import React, { Component } from 'react';
import FeedbackBoard from '../components/FeedbackBoard';
import FeedbackText from '../components/FeedbackText';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        Feedback
        <FeedbackText />
        <FeedbackBoard />
      </div>
    );
  }
}
