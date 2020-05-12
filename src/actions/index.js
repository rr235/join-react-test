import axios from 'axios';

export const FETCH_CANDIDATES = 'fetch_candidates';

export const fetchCandidates = () => async (dispatch) => {
  const { data } = await axios.get(
    'https://candidates.free.beeceptor.com/api/candidate'
  );
  dispatch({ type: FETCH_CANDIDATES, payload: data });
};
