import * as types from "../../store/ActionTypes";

export const handleState = (property, value) => {
  return {
    type: types.HOME_HANDLE_STATE,
    payload: {
      property,
      value,
    },
  };
};

export const handleStateGlobal = (payload) => {
  return {
    type: types.HOME_HANDLE_STATE_GLOBAL,
    payload,
  };
};
