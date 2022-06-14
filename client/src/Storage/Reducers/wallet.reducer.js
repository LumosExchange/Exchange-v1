import { SET_WALLET_BALANCE } from "../Actions/actionTypes";

const initialState = {
  solBalance: 0,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_BALANCE:
      return {
        ...state,
        solBalance: action.payload.solBalance,
      };
    default:
      return state;
  }
};

export default walletReducer;
