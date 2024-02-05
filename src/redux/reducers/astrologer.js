import * as actionTypes from "../actionTypes";

const initialState = {
  astrologerListData: null,
  enquiryAstroData: null
};

const astrologer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ALL_ASTROLOGER: {
      return {
        ...state,
        astrologerListData: payload,
      };
    }

    case actionTypes.SET_ENQUIRY_ASTROLOGERS: {
      return {
        ...state,
        enquiryAstroData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default astrologer;
