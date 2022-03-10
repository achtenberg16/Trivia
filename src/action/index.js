import { requestToken } from '../services/fetchAPI';
import { setLocalStorage } from '../services/LocalStorage';

export const ADD_TOKEN = '@token/add_token';

export const addTokenAction = (token) => {
  console.log(token);
  return ({
    type: ADD_TOKEN,
    payload: token,
  });
};

export const addTokenFetch = () => async (dispatch) => {
  const token = await requestToken();
  setLocalStorage('token', token);
  dispatch(addTokenAction(token));
};
