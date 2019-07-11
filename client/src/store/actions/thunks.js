import axios from 'axios';
import { resolveUser } from './actionCreators';

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/current_user');
  console.log(response);
  dispatch(resolveUser(response));
}