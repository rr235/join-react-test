import axios from 'axios';

export const IS_LOADING = 'is_loading';
export const FETCH_CANDIDATES = 'fetch_candidates';
export const ADD_CANDIDATE = 'add_candidate';
export const REMOVE_CANDIDATE = 'remove_candidate';

export const fetchCandidates = () => async (dispatch) => {
  // get candidates list from session
  let candidatesList = JSON.parse(sessionStorage.getItem('candidates'));

  // if the list is empty fetch the list from the api
  if (!candidatesList) {
    dispatch({ type: IS_LOADING, payload: true });
    const { data } = await axios.get(
      'https://candidates.free.beeceptor.com/api/candidate'
    );
    candidatesList = data;
    sessionStorage.setItem('candidates', JSON.stringify(data));
    dispatch({ type: IS_LOADING, payload: false });
  }

  dispatch({ type: FETCH_CANDIDATES, payload: candidatesList });
};

export const removeCandidate = (email) => (dispatch) => {
  /* Mock api action Start */
  const candidatesList = JSON.parse(sessionStorage.getItem('candidates'));
  sessionStorage.setItem(
    'candidates',
    JSON.stringify(
      candidatesList.filter((candidate) => email !== candidate.email)
    )
  );
  /* Mock api action End */

  dispatch({ type: REMOVE_CANDIDATE, payload: email });
};
