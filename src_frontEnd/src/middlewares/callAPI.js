import { START, SUCCESS, FAIL } from '../actions/types';

export default store => dispatch => async (action) => {
  const { callAPI, type, options, ...rest } = action;
  if (!callAPI) return dispatch(action);

  dispatch({ ...rest, type: type + START });

  try {
    const response = await fetch(callAPI, options);
    const responseJSON = await response.json();
    dispatch({ ...rest, type: type + SUCCESS, payload: responseJSON });
  } catch (error) {
    console.log(`There has been a problem with ${type} process: ${error.message}`);
    dispatch({ ...rest, type: type + FAIL, error });
  }
};
