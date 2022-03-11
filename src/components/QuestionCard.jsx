import React from 'react';
import PropTypes from 'prop-types';
import shuffleArray from '../helpers';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      answers: [],
      responseIntervalIsOver: false,
    };
  }

  componentDidMount() {
    this.shuffleAnswers();
  }

  componentDidUpdate(prevProps) {
    const { questionsIndex } = prevProps;
    const { questionsIndex: indexActual } = this.state;
    if (questionsIndex !== indexActual) this.shuffleAnswers();
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
    const { answers, responseIntervalIsOver } = this.state;
    const { questionActual } = this.props;
    const { correct_answer: correct } = questionActual;

    let wrongIndex = 0;

    const defaultStyle = {
      border: '1px solid black',
    };

    return (
      <div>

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
