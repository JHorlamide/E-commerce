import { v1 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../constants/alertConstant';

export const setAlert = (message, type = 'info', timeout = 5000) => {
  return async (dispatch) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { message, id, type } });

    setTimeout(() => {
      return dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
  };
};
