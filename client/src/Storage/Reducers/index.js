import { combineReducers } from "redux";
import walletReducer from "./wallet.reducer";

export default combineReducers({
  wallet: walletReducer,
});
