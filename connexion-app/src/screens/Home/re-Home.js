import * as types from "../../store/ActionTypes";

const initialState = {
  isLoading: false,
  sortPostsBy: "Latest",
  posts: [],
};

const HomeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.HOME_HANDLE_STATE:
      return { ...state, [payload.property]: payload.value };

    default:
      return state;
  }
};

export default HomeReducer;
