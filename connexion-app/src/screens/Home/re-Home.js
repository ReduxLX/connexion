import * as types from "../../store/ActionTypes";

const initialState = {
  isLoading: false,
  isFetchingPosts: false,
  sortPostsBy: "Latest",
  posts: [],
};

const HomeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.HOME_HANDLE_STATE:
      return { ...state, [payload.property]: payload.value };

    case types.HOME_HANDLE_STATE_GLOBAL:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default HomeReducer;
