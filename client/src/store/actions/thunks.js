import axios from 'axios';
import { paths } from './../../config';
import { resolveUser } from './actionCreators';

export const fetchUser = () => async (dispatch) => {
  const { data: user } = await axios.get(paths.CURRENT_USER);
  dispatch(resolveUser(user));
}

export const handleToken = (token) => async (dispatch) => {
  const { data: user } = await axios.post(paths.STRIPE, token);
  dispatch(resolveUser(user));
}

export const submitSurvey = (formValues) => {
  console.log(formValues);
}