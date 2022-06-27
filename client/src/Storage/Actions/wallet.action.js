import { SET_WALLET_BALANCE } from "./actionTypes";

export const setWalletBalance = (payload) => (dispatch) => {
  console.log(payload);
  dispatch({
    type: SET_WALLET_BALANCE,
    payload,
  });
};
