import { requestToken, requestQuestion } from '../services/fetchAPI';
import { setLocalStorage } from '../services/LocalStorage';

export const ADD_TOKEN = '@token/add_token';
export const ADD_INFOS = '@player/add_infos';
export const ADD_QUEST = '@questions/add_questions';

export const addInfos = (userInfo) => ({
  type: ADD_INFOS,
  payload: userInfo,
});

export const addTokenAction = (token) => {
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

export const addQuestion = (questions) => {
  return ({
    type: ADD_QUEST,
    payload: questions,
  });
};

export const addQuestionFetch = () => async (dispatch, getState) => {
  const { token } = getState();
  let questions = await requestQuestion(token);
  if (questions.results.length === 0) {
    await dispatch(addTokenFetch());
    const { token: newToken } = getState();
    questions = await requestQuestion(newToken);
  }
  dispatch(addQuestion(questions.results));
};
