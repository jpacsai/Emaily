import axios from 'axios';
import { resolveUser } from './actionCreators';

export const fetchUser = () => async (dispatch) => {
  const { data: user } = await axios.get('/api/current_user');
  dispatch(resolveUser(user));
}

export const handleToken = (token) => async (dispatch) => {
  const { data: user } = await axios.post('/api/stripe', token);
  dispatch(resolveUser(user));
}