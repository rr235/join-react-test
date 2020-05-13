import axios from 'axios';
import { getCandidatesListWithScore, getCandidateScore } from '../helper';

export const IS_LOADING = 'is_loading';
export const FETCH_CANDIDATES = 'fetch_candidates';
export const ADD_CANDIDATE = 'add_candidate';
export const REMOVE_CANDIDATE = 'remove_candidate';
export const CHANGE_STATUS = 'change_status';

export const fetchCandidates = () => async (dispatch) => {
  // get candidates list from session
  let candidatesList = JSON.parse(sessionStorage.getItem('candidates'));

  // if the list is empty fetch the list from the api
  if (!candidatesList) {
    dispatch({ type: IS_LOADING, payload: true });
    const { data } = await axios.get(
      'https://candidates.free.beeceptor.com/api/candidate'
    );
    candidatesList = getCandidatesListWithScore(data);
    sessionStorage.setItem('candidates', JSON.stringify(candidatesList));
    dispatch({ type: IS_LOADING, payload: false });
  }

  dispatch({ type: FETCH_CANDIDATES, payload: candidatesList });
};

export const removeCandidate = (email) => (dispatch) =>
  dispatch({ type: REMOVE_CANDIDATE, payload: email });

export const changeStatus = (info) => (dispatch) =>
  dispatch({ type: CHANGE_STATUS, payload: info });

export const addCandidate = (info) => () => {
  const score = getCandidateScore(info);
  const candidate = { ...info, score };

  /* Mock Save */
  let candidatesList = JSON.parse(sessionStorage.getItem('candidates')) || [];
  candidatesList.push(candidate);
  sessionStorage.setItem('candidates', JSON.stringify(candidatesList));

  return true; // Just return true to indicate success. (In real scenario this would probably be a promise.)
};
