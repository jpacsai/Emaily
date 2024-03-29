import * as actionNames from './actionNames';

export const resolveUser = (payload) => ({ type: actionNames.RESOLVE_USER, payload });
export const resolveSurveys = (payload) => ({ type: actionNames.RESOLVE_SURVEYS, payload });
export const resolveSurvey = (payload) => ({ type: actionNames.RESOLVE_SURVEY, payload });
export const removeSurvey = (payload) => ({ type: actionNames.REMOVE_SURVEY, payload });
export const updateSortBy = (payload) => ({ type: actionNames.UPDATE_SORT_BY, payload });
export const updateFilter = (payload) => ({ type: actionNames.UPDATE_FILTER, payload });