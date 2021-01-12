import { all, put, takeLatest } from "redux-saga/effects";
import * as types from "../ActionTypes";

export function* signup(action) {
  try {
    console.log("Start Signup");
    console.log(action);
    // const response = yield call(
    //   GET,
    //   "https://5fe0c3d904f0780017de94b2.mockapi.io/Users",
    //   {}
    // );
    yield put({
      type: types.SIGNUP_SUCCESS,
    });
  } catch (e) {
    console.log("Sign up Failed ->", e);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.SIGNUP_START, signup)]);
}
