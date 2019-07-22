import { RESOLVE_SURVEYS, RESOLVE_SURVEY, REMOVE_SURVEY } from './../actions/actionNames';

export default (state = [], action) => {
  switch (action.type) {
    case RESOLVE_SURVEYS:
      return action.payload;
    case RESOLVE_SURVEY:
      const hasSurvey = state.find(survey => survey._id === action.payload._id);
      return !!hasSurvey
        ? hasSurvey.no === action.payload.yes && hasSurvey.yes === action.payload.yes
          ? state
          : state.map(survey => (survey._id === action.payload._id ? action.payload : survey))
        : [...state, action.payload];
    case REMOVE_SURVEY:
      return state.filter(survey => survey._id !== action.payload);
    default:
      return state;
  }
};
