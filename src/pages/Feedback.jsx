import React from 'react';
import { connect } from 'react-redux';
import { object, PropTypes } from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleButtonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleButtonRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const min = 3;
    return (
      <div className="feedback">
        <Header />
        {
          assertions < min ? (
            <h2 className="fb-message" data-testid="feedback-text">Could be better...</h2>
          ) : <h2 className="fb-message" data-testid="feedback-text">Well Done!</h2>
        }
        <h3 data-testid="feedback-total-score" className="fb-score">
          { score }
        </h3>
        <p data-testid="feedback-total-question" className="fb-assertions">
          {assertions}
        </p>
        <div className="fb-buttons">
          <button
            data-testid="btn-play-again"
            type="button"
            className="fb-button"
            onClick={ this.handleButtonPlayAgain }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            className="fb-button"
            onClick={ this.handleButtonRanking }
          >
            Ranking
          </button>
        </div>
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

export default connect(mapStateToProps)(Feedback);
