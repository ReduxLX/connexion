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

export const signup = (email, password) => {
  return {
    type: types.SIGNUP_START,
    email,
    password,
  };
};
