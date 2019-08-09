import axios from 'axios';
import { paths } from './../../config';
import { resolveUser, resolveSurveys, removeSurvey } from './actionCreators';
import { initSocketIO } from './socket';

export const fetchInitData = () => async (dispatch) => {
  const user = await dispatch(fetchUser());
  if (!!user) dispatch(fetchSurveys());
  if (process.env.NODE_ENV === "development") dispatch(initSocketIO());
}

export const fetchUser = () => async (dispatch) => {
  const { data: user } = await axios.get('/api/current_user');
  dispatch(resolveUser(user));
  return user;
}

export const handleToken = (token) => async (dispatch) => {
  const { data: user } = await axios.post('/api/stripe', token);
  dispatch(resolveUser(user));
}

export const submitSurvey = (formValues, history) => async (dispatch) => {
  const { data: user } = await axios.post('/api/surveys', formValues);
  history.push(paths.SURVEYS);
  dispatch(fetchSurveys());
  dispatch(resolveUser(user));
}

export const fetchSurveys = () => async (dispatch) => {
  const { data: surveys } = await axios.get('api/surveys');
  dispatch(resolveSurveys(surveys));
}

export const deleteSurvey = (surveyId) => async (dispatch) => {
  const { status } = await axios.delete(`api/surveys/${surveyId}`);
  if (status === 200) dispatch(removeSurvey(surveyId))
}

export const deleteUser = (history) => async (dispatch) => {
  const { status } = await axios.delete(`/api/current_user`);
  if (status === 200) {
    await dispatch(fetchUser());
    history.push('/');
  }
}

