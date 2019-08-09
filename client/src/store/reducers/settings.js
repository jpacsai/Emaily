import { RESOLVE_SORT_BY } from './../actions/actionNames';

const defaultState = {
  sortBy: 'newest'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case RESOLVE_SORT_BY:
      return {...state, sortBy: action.payload}
    default:
      return state;
  }
};
