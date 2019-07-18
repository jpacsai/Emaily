import { RESOLVE_SURVEYS } from './../actions/actionNames';

export default (state = [], action) => {
  switch (action.type) {
    case RESOLVE_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}