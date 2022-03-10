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
    return (
      <div>
        <Header />
        <QuestionCard />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitQuestions: () => dispatch(addQuestionFetch()),
});

Game.propTypes = {
  submitQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
