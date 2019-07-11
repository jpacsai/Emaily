import axios from 'axios';
import { resolveUser } from './actionCreators';

export const fetchUser = () => async (dispatch) => {
  const { data } = await axios.get('/api/current_user');
  dispatch(resolveUser(data));
}