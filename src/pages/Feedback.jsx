import React from 'react';
import { connect } from 'react-redux';
import { object, PropTypes } from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { assertions, score } = this.props;
    const min = 3;
    return (
      <div className="feedback">
        <Header />
        {
          assertions < min ? (
            <h2 className="fb-message" data-testid="feedback-text">Could be better</h2>
          ) : <h2 className="fb-message" data-testid="feedback-text">Well Done!</h2>
        }
        <h3 data-testid="feedback-total-score" className="fb-score">
          { `Your score: ${score}` }
        </h3>
        <p data-testid="feedback-total-question" className="fb-assertions">
          { `You got ${assertions} questions right` }
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          className="fb-button"
          onClick={ this.handleButton }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: object,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

// state.player.assertions
export default connect(mapStateToProps)(Feedback);
