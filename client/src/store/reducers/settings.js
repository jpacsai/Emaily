import { UPDATE_SORT_BY, UPDATE_FILTER } from './../actions/actionNames';

const defaultState = {
  sortBy: 'newest',
  filter: 'all'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SORT_BY:
      return { ...state, sortBy: action.payload };
    case UPDATE_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
