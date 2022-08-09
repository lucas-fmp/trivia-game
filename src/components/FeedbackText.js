import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackText extends Component {
  render() {
    const { score } = this.props;
    const limit = 3;
    return (
      <div>
        <p
          data-testid="feedback-text"
        >
          {
            score < limit ? 'Could be better...' : 'Well Done!'
          }
        </p>
      </div>
    );
  }
}

FeedbackText.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerInfo: state.player.score,
});

export default connect(mapStateToProps, null)(FeedbackText);
