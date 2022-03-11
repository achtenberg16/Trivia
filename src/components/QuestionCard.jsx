import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import shuffleArray from '../helpers';
import { updateScoreAction, updateIndexAction } from '../action';
import { getItemLocalStorage, setLocalStorage } from '../services/LocalStorage';

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
    const { questionActual: prevQuest } = prevProps;
    const { questionActual } = this.props;
    if (prevQuest !== questionActual) {
      this.shuffleAnswers();
    }
  }

  createFormatObjectRanking = () => {
    const { player } = this.props;
    const { name, gravatarEmail, score } = player;
    const hash = md5(gravatarEmail).toString();
    const resultPlayer = { name, score, picture: `https://www.gravatar.com/avatar/${hash}` };
    this.updateRankingStorage(resultPlayer);
  }

  updateRankingStorage = (resultPlayerObject) => {
    const previousRank = getItemLocalStorage('ranking');
    if (previousRank) {
      const newRank = [...previousRank, resultPlayerObject]
        .sort((a, b) => a.score - b.score);
      setLocalStorage('ranking', newRank);
      return 'já existia um rank';
    }
    setLocalStorage('ranking', [resultPlayerObject]);
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
    const { updateQuestionIndex, history, questionsIndex } = this.props;
    if (questionsIndex === TOTAL_QUESTIONS - 1) {
      this.createFormatObjectRanking();
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

const mapStateToProps = ({ player }) => ({
  player,
});

QuestionCard.propTypes = {
  questionActual: PropTypes.object,
  updateScore: PropTypes.func,
  updateQuestionIndex: PropTypes.func,
  history: PropTypes.func,
  player: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
