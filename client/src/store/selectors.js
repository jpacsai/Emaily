import { createSelector } from 'reselect';

export const getMe = state => state.auth;

export const getSurveys = state => state.surveys;

export const getSurvey = createSelector(
  [getSurveys, (state, id) => id],
  (surveys, id) => {
    if (!surveys) return null;
    const survey = surveys.find(survey => survey._id === id);
    return survey || null;
  }
);

export const getSurveyResults = createSelector(
  getSurvey,
  survey => {
    if (!survey) return null;
    const { yes, no } = survey;
    return {
      yes,
      no
    }
  }
)

export const getForm = state => state.form;