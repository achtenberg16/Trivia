import { ADD_INFOS } from '../action';

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
      ...state, ...action.payload,
    };
  }
  default: return state;
  }
};

export default player;
