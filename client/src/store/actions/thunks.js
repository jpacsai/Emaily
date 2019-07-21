import axios from 'axios';
import { paths } from './../../config';
import { resolveUser, resolveSurveys } from './actionCreators';
import { initSocketIO } from './socket';

export const fetchInitData = () => async (dispatch) => {
  dispatch(fetchUser());
  if (process.env.NODE_ENV === "development") dispatch(initSocketIO());
}

export const fetchUser = () => async (dispatch) => {
  const { data: user } = await axios.get('/api/current_user');
  dispatch(resolveUser(user));
}

export const handleToken = (token) => async (dispatch) => {
  const { data: user } = await axios.post('/api/stripe', token);
  dispatch(resolveUser(user));
}

export const submitSurvey = (formValues, history) => async (dispatch) => {
  const { data: user } = await axios.post('/api/surveys', formValues);

  history.push(paths.SURVEYS);
  dispatch(resolveUser(user));
}

export const fetchSurveys = () => async (dispatch) => {
  const { data: surveys } = await axios.get('api/surveys');
  dispatch(resolveSurveys(surveys));
}