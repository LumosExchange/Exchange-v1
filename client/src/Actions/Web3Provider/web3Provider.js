import {
    CREATE_PROVIDER,
    UPDATE_PROVIDER,
    DELETE_PROVIDER,
    SET_WALLET_ADDRESS,
    SET_USER_LISTED_INFO,
  } from "./types.js";
  
  export const createProvider = (payload) => async (dispatch) => {
    dispatch({
      type: CREATE_PROVIDER,
      payload: payload,
    });
  };
  
  export const updateProvider = (payload) => async (dispatch) => {
    console.log(payload);
    dispatch({
      type: UPDATE_PROVIDER,
      payload: payload,
    });
  };
  
  export const deleteProvider = () => async (dispatch) => {
    dispatch({
      type: DELETE_PROVIDER,
      payload: {},
    });
  };

  export const setWalletAddress = (payload) => async (dispatch) => {
    dispatch({
      type: SET_WALLET_ADDRESS,
      payload: payload,
    });
  };

  export const setUserListedInfo = (payload) => async (dispatch) => {
    dispatch({
      type: SET_USER_LISTED_INFO,
      payload: payload,
    });
  };

