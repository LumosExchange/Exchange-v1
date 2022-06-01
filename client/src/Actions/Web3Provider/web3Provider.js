import {
    CREATE_PROVIDER,
    UPDATE_PROVIDER,
    DELETE_PROVIDER,
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
