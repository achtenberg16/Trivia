import { ADD_TOKEN } from '../action';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN: {
    return action.payload;
  }
  default: return state;
  }
};

export default token;
