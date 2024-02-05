import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { add_remedy, api_url, delete_remedy, get_remedy, get_skills, update_remedy } from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* getRemedies() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_remedy,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_ALL_REMEDIES,
        payload: response?.remedies,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* createRemedies(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_remedy,
      header: 'form',
      data: payload?.data
    }); 

    console.log(response);
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Remady Added Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.reset())
      // handleReset();
      yield put({
        type: actionTypes.GET_ALL_REMEDIES,
        payload: null,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Skill Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }

  

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateRemedies(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_remedy,
      header: 'form',
      data: payload?.data
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Remady Added Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({type: actionTypes.GET_ALL_REMEDIES, payload: null})
      yield call(payload?.reset())
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Skill Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteRemedies(actions) {
  try {
    const { payload } = actions;
    console.log(payload)
    const result = yield Swal.fire({
      title: `Are you sure to Delete ${payload?.remedy}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    })
    
    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_remedy,
        header: "json",
        data: {
          remedyId: payload?.remedy_id
        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Skill Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_REMEDIES, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Skill Delete Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

  
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

export default function* remediesSaga() {
  yield takeLeading(actionTypes.GET_ALL_REMEDIES, getRemedies);
  yield takeLeading(actionTypes.CREATE_REMEDY, createRemedies);
  yield takeLeading(actionTypes.UPDATE_REMEDY, updateRemedies);
  yield takeLeading(actionTypes.DELETE_REMEDY, deleteRemedies);
}
