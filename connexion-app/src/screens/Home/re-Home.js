import * as types from "../../store/ActionTypes";

const initialState = {
  isLoading: false,
  isFetchingPosts: false,
  isFetchingUserPosts: false,
  isFetchingSinglePost: false,
  isFetchingComments: false,
  isFetchingTopUsers: false,
  sortPostsBy: "Latest",
  posts: [],
  topUsers: [],
  userPosts: [],
  userData: {},
  cachedCategory: "",
};

const HomeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.HOME_HANDLE_STATE:
      return { ...state, [payload.property]: payload.value };

    case types.HOME_HANDLE_STATE_GLOBAL: {
      return { ...state, ...payload };
    }

    case types.UPVOTE_POST: {
      const { index, hasUpvoted } = payload;
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, index),
          { ...state.posts[index], hasUpvoted },
          ...state.posts.slice(index + 1),
        ],
      };
    }

    case types.DOWNVOTE_POST: {
      const { index, hasDownvoted } = payload;
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, index),
          { ...state.posts[index], hasDownvoted },
          ...state.posts.slice(index + 1),
        ],
      };
    }

    case types.SET_RATING: {
      const { index, rating } = payload;
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, index),
          { ...state.posts[index], realRating: rating },
          ...state.posts.slice(index + 1),
        ],
      };
    }

    default:
      return state;
  }
};

export default HomeReducer;
