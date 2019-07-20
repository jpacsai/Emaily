import { createSelector } from 'reselect';

export const getMe = (state) => state.auth;

export const getSurveys = (state) => state.surveys;

export const getForm = (state) => state.form;

export const getFormValues = (state) => createSelector(
  getForm,
  form => (form && form.surveyForm && form.surveyForm.values) || null
)