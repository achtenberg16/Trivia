import { ADD_INFOS, ADD_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_INFOS: {
    return {
      ...state,
      ...action.payload,
      assertions: 0,
      score: 0,
    };
  }
  case ADD_SCORE: {
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  }
  default: return state;
  }
};
export default player;
