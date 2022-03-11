import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const min = 3;
    return (
      <div className="feedback">
        <Header />
        {
          assertions < min ? (
            <h3 className="fb-message" data-testid="feedback-text">Could be better</h3>
          ) : <h3 className="fb-message" data-testid="feedback-text">Well Done!</h3>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

// state.player.assertions
export default connect(mapStateToProps)(Feedback);
