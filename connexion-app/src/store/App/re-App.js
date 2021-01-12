import * as types from "../../store/ActionTypes";

const initialState = {
  isLoading: false,
  isSignedIn: false,
  muiModalOpen: false,
  isSnackbarVisible: false,
  snackbarVariant: "error",
  snackbarMsg: "",
};

const AppReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.APP_HANDLE_STATE:
      return { ...state, [payload.property]: payload.value };

    case types.APP_HANDLE_STATE_GLOBAL: {
      return { ...state, ...payload };
    }

    default:
      return state;
  }
};

export default AppReducer;
