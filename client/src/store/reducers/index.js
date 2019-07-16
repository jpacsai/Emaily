import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import auth from './auth';

export default combineReducers({
  auth,
  form: reduxForm
});