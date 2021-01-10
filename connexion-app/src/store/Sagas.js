import { all } from "redux-saga/effects";
import App from "./App/sa-App";

export default function* rootSaga() {
  yield all([App()]);
}
