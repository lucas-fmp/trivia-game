import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackText extends Component {
  render() {
    const { assertions } = this.props;
    const limit = 3;
    return (
      <div>
        <p
          data-testid="feedback-text"
        >
          {
            assertions < limit ? 'Could be better...' : 'Well Done!'
          }
        </p>
      </div>
    );
  }
}

FeedbackText.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(FeedbackText);
