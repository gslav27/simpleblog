import { START, SUCCESS, FAIL } from '../actionTypes';

export default ({ dispatch }) => next => async (action) => {
  const { callAPI, type, options, ...rest } = action;
  if (!callAPI) return next(action);

  dispatch({ ...rest, type: type + START });
  const { payload: initialPayload } = rest;

  try {
    const response = await fetch(callAPI, options);
    const responseJSON = await response.json();
    if (!response.ok) throw new Error(responseJSON.message);

    dispatch({
      ...rest,
      initialPayload,
      type: type + SUCCESS,
      payload: responseJSON,
    });
  } catch (error) {
    console.log(`There has been a problem with ${type} process: ${error.message}`);
    
    dispatch({
      ...rest,
      initialPayload,
      type: type + FAIL,
      payload: error.message,
    });
  }
};
