import * as actionTypes from "../actionTypes";

const initialState = {
  chatHistoryData: null,
  chatSummaryData: [],
  callHistoryData: null,
};

const history = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_CHAT_HISTORY: {
      return {
        ...state,
        chatHistoryData: payload,
      };
    }

    case actionTypes.SET_CHAT_SUMMARY: {
      return {
        ...state,
        chatSummaryData: payload,
      };
    }

    case actionTypes.SET_CALL_HISTORY: {
      return {
        ...state,
        callHistoryData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default history;
