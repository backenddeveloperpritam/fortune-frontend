import { all } from "redux-saga/effects";
import reviewSaga from "./reviewSaga";
import customerSaga from "./customerSaga";
import astrologerSaga from "./astrologerSaga";
import expertiesSaga from "./expertiesSaga";
import skillsSaga from "./skillsSaga";
import remediesSaga from "./remediesSaga";
import bannerSaga from './bannerSaga'
import notificationSaga from "./notificationSaga";
import historySaga from "./historySaga"
import dashboardSaga from "./dashboardSaga";
import reportSaga from "./reportsSaga";

export default function* rootSaga() {
  yield all([
    reviewSaga(),
    customerSaga(),
    astrologerSaga(),
    expertiesSaga(),
    skillsSaga(),
    remediesSaga(),
    bannerSaga(),
    notificationSaga(),
    historySaga(),
    dashboardSaga(),
    reportSaga()
  ]);
}
