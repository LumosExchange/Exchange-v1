import {
  CHANGE_STATUS_LIST_FOR_SALE,
  CHANGE_STATUS_DELIST_FOR_SALE,
  CHANGE_STATUS_MAKE_OFFER,
  CHANGE_STATUS_CANCEL_OFFER,
  CHANGE_STATUS_ACCEPT_OFFER,
} from "./types";

export const changeStatusListForSale = (payload) => async (dispatch) => {
  dispatch({
    type: CHANGE_STATUS_LIST_FOR_SALE,
    payload: payload,
  });
};

export const changeStatusDelistForSale = (payload) => async (dispatch) => {
  dispatch({
    type: CHANGE_STATUS_DELIST_FOR_SALE,
    payload: payload,
  });
};

export const changeStatusMakeOffer = (payload) => async (dispatch) => {
  dispatch({
    type: CHANGE_STATUS_MAKE_OFFER,
    payload: payload,
  });
};

export const changeStatusCancelOffer = (payload) => async (dispatch) => {
  dispatch({
    type: CHANGE_STATUS_CANCEL_OFFER,
    payload: payload,
  });
};

export const changeStatusAcceptOffer = (payload) => async (dispatch) => {
  dispatch({
    type: CHANGE_STATUS_ACCEPT_OFFER,
    payload: payload,
  });
};
