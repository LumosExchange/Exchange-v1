import { combineReducers } from "redux";
import web3Provider from "./web3Provider";
import contractActionStatus from "./contractActionStatus";

export default combineReducers({
  web3Provider,
  contractActionStatus,
});
