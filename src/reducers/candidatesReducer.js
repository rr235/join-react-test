import { FETCH_CANDIDATES, REMOVE_CANDIDATE } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CANDIDATES:
      return action.payload;
    case REMOVE_CANDIDATE:
      return state.filter(({ email }) => email !== action.payload);
    default:
      return state;
  }
}
