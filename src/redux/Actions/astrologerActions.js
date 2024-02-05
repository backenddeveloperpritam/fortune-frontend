import * as actionTypes from "../actionTypes";

export const getAllAstrologer = (payload) => ({
  type: actionTypes.GET_ALL_ASTROLOGER,
  payload,
});

export const setAllAstrologer = (payload) => ({
  type: actionTypes.SET_ALL_ASTROLOGER,
  payload,
});

export const updateAstrologerChatStatus = (payload) => ({
  type: actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS,
  payload,
});

export const updateAstrologerCallStatus = (payload) => ({
  type: actionTypes.UPDATE_ASTROLOER_CALL_STATUS,
  payload,
});

export const getEnquiryAstrologers = payload =>({
  type: actionTypes.GET_ENQUIRY_ASTROLOGERS,
  payload
})

export const setEnquiryAstrologers = payload =>({
  type: actionTypes.SET_ENQUIRY_ASTROLOGERS,
  payload
})

export const updateEnquiryStatus = payload =>({
  type: actionTypes.UPDATE_ENQUIRY_STATUS,
  payload
})

export const updateAstrologerData = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_DATA, 
  payload
})

export const addAstrologer = payload =>({
  type: actionTypes.ADD_ASTROLOGER,
  payload
})

export const verifyUnverifyAstrologer = payload =>({
  type: actionTypes.VERIFY_UNVERIFY_ASTROLOGER,
  payload
})

export const deleteAstrologer = payload =>({
  type: actionTypes.DELETE_ASTROLOGER,
  payload
})