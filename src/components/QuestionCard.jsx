import React from 'react';
import PropTypes from 'prop-types';
import shuffleArray from '../helpers';

const TIMER_TO_RESPONDE = 30;
const ONE_SECOND = 1000;

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
    this.initTimer();
  }

  componentDidUpdate(prevProps) {
    const { questionsIndex } = prevProps;
    const { questionsIndex: indexActual } = this.state;
    if (questionsIndex !== indexActual) this.shuffleAnswers();
  }

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
    const { questionActual, questionsIndex } = this.props;
    const { incorrect_answers: incorrects, correct_answer: correct } = questionActual;
    const answers = shuffleArray([...incorrects, correct]);
    this.setState({ answers, questionsIndex });
  }

  handleResponse = () => {
    this.setState({ responseIntervalIsOver: true });
  }

  handleBorder = (option, correct) => ({
    border: option !== correct
      ? '3px solid rgb(255, 0, 0)'
      : '3px solid rgb(6, 240, 15)',
  });

  render() {
    const { answers, responseIntervalIsOver, timer } = this.state;
    const { questionActual } = this.props;
    const { correct_answer: correct } = questionActual;

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
                onClick={ this.handleResponse }
                style={ responseIntervalIsOver
                  ? this.handleBorder(asw, correct) : defaultStyle }
              >
                {asw}
              </button>
            );
          })}
        </div>

      </div>
    );
  }
}

QuestionCard.propTypes = {
  questionActual: PropTypes.object,
}.isRequired;

export default QuestionCard;
