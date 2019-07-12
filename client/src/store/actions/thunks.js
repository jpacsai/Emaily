import axios from 'axios';
import { resolveUser } from './actionCreators';

export const fetchUser = () => async (dispatch) => {
  const { userData } = await axios.get('/api/current_user');
  dispatch(resolveUser(userData));
}

export const handleToken = (token) => async (dispatch) => {
  const userData = await axios.post('/api/stripe', token);
  dispatch(resolveUser(userData));
}