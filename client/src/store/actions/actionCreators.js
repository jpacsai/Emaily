import * as actionNames from './actionNames';

export const resolveUser = (payload) => ({ type: actionNames.RESOLVE_USER, payload });
export const resolveSurvey = (payload) => ({ type: actionNames.RESOLVE_SURVEYS, payload });