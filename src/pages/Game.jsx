import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addQuestionFetch } from '../action';
import QuestionCard from '../components/QuestionCard';

export class Game extends Component {
  componentDidMount() {
    const { submitQuestions } = this.props;
    submitQuestions();
  }

  render() {
    const { questions: { questions, questionsIndex }, history } = this.props;
    const questionActual = questions[questionsIndex];
    return (
      <div>
        <Header />

        {questionActual && <QuestionCard
          questionActual={ questionActual }
          questionsIndex={ questionsIndex }
          history={ history }
        />}
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  submitQuestions: () => dispatch(addQuestionFetch()),
});

Game.propTypes = {
  submitQuestions: PropTypes.func,
  questions: PropTypes.object,
  history: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
