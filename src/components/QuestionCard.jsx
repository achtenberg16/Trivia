import React from 'react';
import { connect } from 'react-redux';
import shuffleArray from '../helpers';

class QuestionCard extends React.Component {
  render() {
    const { questions: { questions, questionsIndex } } = this.props;
    let wrongIndex = 0;
    const updateIndex = () => {
      wrongIndex += 1;
    };
    let questionActual = '';
    if (questions.length > 0) {
      questionActual = questions[questionsIndex];
      const { incorrect_answers, correct_answer } = questionActual;
      const answers = shuffleArray([...incorrect_answers, correct_answer]);
      return (
        <div>
          <h2 data-testid="question-category">{ questionActual.category }</h2>
          <h3 data-testid="question-text">{ questionActual.question }</h3>
          <div data-testid="answer-options">
            { answers.map((asw) => {
              let testID = 'correct-answer';
              if (asw !== correct_answer) {
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
    return (
      <div />
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions,
});

export default connect(mapStateToProps)(QuestionCard);
