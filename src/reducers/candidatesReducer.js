import { FETCH_CANDIDATES, REMOVE_CANDIDATE, CHANGE_STATUS } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CANDIDATES:
      return action.payload;
    case REMOVE_CANDIDATE: {
      const newState = state.filter(({ email }) => email !== action.payload);
      sessionStorage.setItem('candidates', JSON.stringify(newState)); // DON'T EVER DO THIS KIND OF ACTION IN PRODUCTION CODE ;P
      return newState;
    }
    case CHANGE_STATUS: {
      const candidate = state.find(
        ({ email }) => email === action.payload.email
      );
      const index = state.indexOf(candidate);
      const newState = [...state];

      candidate.state = action.payload.status;

      // replace the entry with updated state
      newState.splice(index, 1, candidate);

      sessionStorage.setItem('candidates', JSON.stringify(newState)); // DON'T EVER DO THIS KIND OF ACTION IN PRODUCTION CODE ;P
      return newState;
    }
    default:
      return state;
  }
}
