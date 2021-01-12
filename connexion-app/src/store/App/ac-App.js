import * as types from "../ActionTypes";

export const handleState = (property, value) => {
  return {
    type: types.APP_HANDLE_STATE,
    payload: {
      property,
      value,
    },
  };
};

export const handleStateGlobal = (payload) => {
  return {
    type: types.APP_HANDLE_STATE_GLOBAL,
    payload,
  };
};
