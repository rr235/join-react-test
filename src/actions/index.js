import axios from 'axios';

export const FETCH_CANDIDATES = 'fetch_candidates';
export const ADD_CANDIDATE = 'add_candidate';
export const IS_LOADING = 'is_loading';

export const fetchCandidates = () => async (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  const { data } = await axios.get(
    'https://candidates.free.beeceptor.com/api/candidate'
  );
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({ type: FETCH_CANDIDATES, payload: data });
};
