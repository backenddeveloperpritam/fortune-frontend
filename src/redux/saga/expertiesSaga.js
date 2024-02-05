import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  add_expertise,
  add_main_expertise,
  api_url,
  delete_expertise,
  delete_main_expertise,
  get_expertise,
  get_main_expertise,
  update_expertise,
  update_main_expertise,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* createExperties(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_expertise,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Experties Added Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({type: actionTypes.GET_ALL_EXPERTIES, payload: null})
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Experties Submission Failed",
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

function* createMainExperties(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_main_expertise,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Main Experties Added Successfull",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({type: actionTypes.GET_ALL_MAIN_EXPERTIES, payload: null})

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Main Experties Submission Failed",
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

function* updateExperties(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_expertise,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Experties Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({type: actionTypes.GET_ALL_EXPERTIES, payload: null})

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Experties Update Failed",
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

function* updateMainExperties(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_main_expertise,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Main Experties Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({type: actionTypes.GET_ALL_MAIN_EXPERTIES, payload: null})

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Main Experties Update Failed",
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

function* deleteExperties(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure to Delete ${payload?.experties}`,
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
        url: api_url + delete_expertise,
        header: "json",
        data: {
          expertiseId: payload?.experties_id
        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Experties Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_EXPERTIES, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Experties Delete Failed",
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

function* deleteMainExperties(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure to Delete ${payload?.main_experties}`,
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
        url: api_url + delete_main_expertise,
        header: "json",
        data: {
          mainExpertiseId: payload?.main_experties_id
        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Main Experties Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_MAIN_EXPERTIES, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Main Experties Delete Failed",
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

function* getExperties() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_expertise,
    });

    if (response?.success) {
        yield put({
          type: actionTypes.SET_ALL_EXPERTIES,
          payload: response?.expertise,
        });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getMainExperties() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.getRequest({
      url: api_url + get_main_expertise,
    });

    if (response?.success) {
        yield put({
          type: actionTypes.SET_ALL_MAIN_EXPERTIES,
          payload: response?.mainExpertise,
        });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

export default function* expertiesSaga() {
  yield takeLeading(actionTypes.GET_ALL_EXPERTIES, getExperties);
  yield takeLeading(actionTypes.GET_ALL_MAIN_EXPERTIES, getMainExperties);
  yield takeLeading(actionTypes.CREATE_EXPERTIES, createExperties)
  yield takeLeading(actionTypes.CREATE_MAIN_EXPERTIES, createMainExperties)
  yield takeLeading(actionTypes.UPDATE_EXPERTIES, updateExperties)
  yield takeLeading(actionTypes.UPDATE_MAIN_EXPERTIES, updateMainExperties)
  yield takeLeading(actionTypes.DELETE_EXPERTIES, deleteExperties)
  yield takeLeading(actionTypes.DELETE_MAIN_EXPERTIES, deleteMainExperties)

}
