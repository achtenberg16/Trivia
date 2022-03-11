import React from 'react';
import PropTypes from 'prop-types';
import shuffleArray from '../helpers';

class QuestionCard extends React.Component {
  render() {
    const { questionActual } = this.props;
    const { incorrect_answers: incorrects, correct_answer: correct } = questionActual;

    let wrongIndex = 0;
    const updateIndex = () => {
      wrongIndex += 1;
    };

    const answers = shuffleArray([...incorrects, correct]);

    return (
      <div>

        <h2 data-testid="question-category">{ questionActual.category }</h2>
        <h3 data-testid="question-text">{ questionActual.question }</h3>

        <div data-testid="answer-options">
          { answers.map((asw) => {
            let testID = 'correct-answer';
            if (asw !== correct) {
              testID = `wrong-answer-${wrongIndex}`;
              updateIndex();
            }

            return (
              <button
                data-testid={ testID }
                key={ asw }
                type="button"
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
