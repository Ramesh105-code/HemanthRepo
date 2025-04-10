export const fetchMatches = () => async (dispatch) => {
    dispatch({ type: FETCH_MATCHES_REQUEST });
    try {
      const response = await axios.get("https://jsonmock.hackerrank.com/api/football_matches?page=2");
      dispatch({ type: FETCH_MATCHES_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: FETCH_MATCHES_FAILURE });
    }
  };
  