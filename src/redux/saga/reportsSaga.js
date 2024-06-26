import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import {
  api_url,
  get_admin_earnig_history,
} from "../../utils/Constants";
import { ApiRequest } from "../../utils/apiRequest";
import * as actionTypes from "../actionTypes";

function* getAdminEarnings() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_admin_earnig_history,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_ADMIN_EARNINGS,
        payload: response.history.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

export default function* reportSaga() {
  yield takeLeading(actionTypes.GET_ADMIN_EARNINGS, getAdminEarnings);
}
