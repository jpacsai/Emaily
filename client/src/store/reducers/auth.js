import { RESOLVE_USER } from './../actions/actionNames';

export default (state = null, action) => {
  switch (action.type) {
    case RESOLVE_USER:
      return action.payload || false;
    default:
      return state;
  }
}