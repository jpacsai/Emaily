import { createSelector } from 'reselect';

export const getMe = state => state.auth;

export const getSurveys = state => state.surveys;

export const getForm = state => state.form;
