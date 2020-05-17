import axios from 'axios';

export const IS_LOADING = 'is_loading';
export const FETCH_CANDIDATES = 'fetch_candidates';
export const ADD_CANDIDATE = 'add_candidate';
export const REMOVE_CANDIDATE = 'remove_candidate';
export const UPDATE_CANDIDATE = 'update_candidate';

export const fetchCandidates = () => async (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  const { data } = await axios.get('http://localhost:5000/candidates');
  dispatch({ type: IS_LOADING, payload: false });

  dispatch({ type: FETCH_CANDIDATES, payload: data });
};

export const removeCandidate = (id) => async (dispatch) => {
  try {
    await axios.delete('http://localhost:5000/removeCandidate', id);
    dispatch({ type: REMOVE_CANDIDATE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const changeStatus = (info) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      'http://localhost:5000/updateCandidateStatus',
      info
    );
    dispatch({ type: UPDATE_CANDIDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addCandidate = (candidate) => async (dispatch) => {
  return axios
    .post('http://localhost:5000/addCandidate', candidate)
    .then(({ data }) => {
      dispatch({ type: ADD_CANDIDATE, payload: data });
    });
};
