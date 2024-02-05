import { combineReducers } from "redux";
// import {CLEAN_STORE} from '../actionTypes/userActionTypes';
import dashboard from "./dashboard";
import review from "./review";
import customer from "./customer";
import astrologer from "./astrologer";
import experites from "./experties";
import skills from "./skills";
import remedies from "./remedies";
import banners from "./banner";
import notification from './notification'
import history from "./history";
import reports from "./reports";

const rootReducer = combineReducers({
  dashboard,
  review,
  customer,
  astrologer,
  experites,
  skills,
  remedies,
  banners,
  notification,
  history,
  reports
});

// const appReducer = (state, action) => {
//   if (action.type == CLEAN_STORE) {
//     state = undefined; 
//   }
//   return rootReducer(state, action);
// };

export default rootReducer;
