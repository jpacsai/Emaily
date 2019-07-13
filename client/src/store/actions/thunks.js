import axios from 'axios';
import { resolveUser } from './actionCreators';

export const fetchUser = () => async (dispatch) => {
  const { data } = await axios.get('/api/current_user');
  dispatch(resolveUser(data));
}

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch(resolveUser(res));
}