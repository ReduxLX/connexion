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

export const setHasUpvoted = (index, hasUpvoted) => {
  return {
    type: types.UPVOTE_POST,
    payload: {
      index,
      hasUpvoted,
    },
  };
};

export const setHasDownvoted = (index, hasDownvoted) => {
  return {
    type: types.DOWNVOTE_POST,
    payload: {
      index,
      hasDownvoted,
    },
  };
};

export const setRating = (index, rating) => {
  return {
    type: types.SET_RATING,
    payload: {
      index,
      rating,
    },
  };
};
