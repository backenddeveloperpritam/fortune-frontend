import * as actionTypes from "../actionTypes";

export const getAdminEarnings = payload =>({
    type: actionTypes.GET_ADMIN_EARNINGS,
    payload
})

export const setAdminEarnings = payload =>({
    type: actionTypes.SET_ADMIN_EARNINGS,
    payload
})