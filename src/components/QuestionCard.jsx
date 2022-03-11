import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shuffleArray from '../helpers';
import { updateScoreAction, updateIndexAction } from '../action';

const TOTAL_QUESTIONS = 5;
const TIMER_TO_RESPONDE = 30;
const ONE_SECOND = 1000;
const FIXED_POINTS_PER_HIT = 10;
const multipleForDifficulty = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      answers: [],
      responseIntervalIsOver: false,
      timer: TIMER_TO_RESPONDE,
    };
  }

  componentDidMount() {
    this.shuffleAnswers();
  }

  componentDidUpdate(prevProps) {
    const { questionsIndex } = prevProps;
    const { questionsIndex: indexActual } = this.props;
    if (questionsIndex !== indexActual) this.shuffleAnswers();
  }

  sumPoints = (time, difficulty) => (
    FIXED_POINTS_PER_HIT + (time * multipleForDifficulty[difficulty]));

  initTimer = () => {
    this.timer = setInterval(() => {
      const { timer } = this.state;

      if (timer === 0) { this.timeOver(); return true; }
      this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
    }, ONE_SECOND);
  }

timeOver = () => {
  clearInterval(this.timer);
  this.setState({ responseIntervalIsOver: true });
}

  shuffleAnswers = () => {
    const { questionActual } = this.props;
    const { incorrect_answers: incorrects, correct_answer: correct } = questionActual;
    const answers = shuffleArray([...incorrects, correct]);
    this.setState({ answers, timer: 30, responseIntervalIsOver: false });
    this.initTimer();
  }

  handleResponse = (timer, difficulty, chosenAlternative, correct) => {
    const { updateScore } = this.props;
    this.timeOver();
    if (chosenAlternative === correct) {
      const pointsEarned = this.sumPoints(timer, difficulty);
      updateScore(pointsEarned);
    }
  }

  nextClick = () => {
    const { updateQuestionIndex, questionsIndex, history } = this.props;
    if (questionsIndex === TOTAL_QUESTIONS - 1) {
      history.push('/feedback');
    } else { updateQuestionIndex(); }
  }

  handleBorder = (option, correct) => ({
    border: option !== correct
      ? '3px solid rgb(255, 0, 0)'
      : '3px solid rgb(6, 240, 15)',
  });

  render() {
    const { answers, responseIntervalIsOver, timer } = this.state;
    const { questionActual } = this.props;
    const { correct_answer: correct, difficulty } = questionActual;

    let wrongIndex = 0;

    const defaultStyle = {
      border: '1px solid black',
    };

    return (
      <div>
        <h1>{timer}</h1>
        <h2 data-testid="question-category">{ questionActual.category }</h2>
        <h3 data-testid="question-text">{ questionActual.question }</h3>

        <div data-testid="answer-options">
          { answers.map((asw) => {
            let testID = 'correct-answer';
            if (asw !== correct) {
              testID = `wrong-answer-${wrongIndex}`;
              wrongIndex += 1;
            }

            return (
              <button
                data-testid={ testID }
                key={ asw }
                type="button"
                disabled={ responseIntervalIsOver }
                onClick={ () => this.handleResponse(timer, difficulty, asw, correct) }
                style={ responseIntervalIsOver
                  ? this.handleBorder(asw, correct) : defaultStyle }
              >
                {asw}
              </button>
            );
          })}
        </div>
        {responseIntervalIsOver
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextClick }
          >
            Next

          </button>)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(updateScoreAction(score)),
  updateQuestionIndex: () => dispatch(updateIndexAction()),
});

QuestionCard.propTypes = {
  questionActual: PropTypes.object,
  updateScore: PropTypes.func,
  updateQuestionIndex: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(QuestionCard);
