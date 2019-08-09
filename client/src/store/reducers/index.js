import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import auth from './auth';
import surveys from './surveys';
import settings from './settings';

export default combineReducers({
  auth,
  surveys,
  settings,
  form: reduxForm
});