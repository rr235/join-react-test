import {
  FETCH_CANDIDATES,
  REMOVE_CANDIDATE,
  UPDATE_CANDIDATE,
} from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CANDIDATES:
      return action.payload;
    case REMOVE_CANDIDATE: {
      const newState = state.filter(({ id }) => id !== action.payload);
      return newState;
    }
    case UPDATE_CANDIDATE: {
      const candidate = state.find(({ id }) => id === action.payload.id);
      const index = state.indexOf(candidate);
      const newState = [...state];

      // replace the entry with updated state
      newState.splice(index, 1, action.payload);

      return newState;
    }
    default:
      return state;
  }
}
