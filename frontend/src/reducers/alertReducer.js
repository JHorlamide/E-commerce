import { SET_ALERT, REMOVE_ALERT } from '../constants/alertConstant';

export const alertReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => {
        return alert.id !== payload;
      });
    default:
      return state;
  }
};

