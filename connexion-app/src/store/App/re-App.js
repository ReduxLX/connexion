import * as types from "../../store/ActionTypes";

const initialState = {
  isSignedIn: false,
};

const AppReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.APP_HANDLE_STATE:
      return { ...state, [payload.property]: payload.value };

    default:
      return state;
  }
};

export default AppReducer;
