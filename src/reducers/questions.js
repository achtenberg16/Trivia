import { ADD_QUEST, UPDATE_INDEX, RESET_INDEX } from '../action';

const INITIAL_STATE = {
  questions: [],
  questionsIndex: 0,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUEST:
    return { ...state, questions: action.payload };
  case UPDATE_INDEX: {
    return { ...state, questionsIndex: state.questionsIndex + 1 };
  }
  case RESET_INDEX: {
    return {
      ...state,
      questions: [],
      questionsIndex: 0,
    };
  }
  default:
    return state;
  }
};

export default questions;
