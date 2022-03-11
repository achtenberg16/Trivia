import { ADD_QUEST } from '../action';

const INITIAL_STATE = {
  questions: [],
  questionsIndex: 0,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUEST:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
};

export default questions;
