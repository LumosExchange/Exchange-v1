import {
  CHANGE_STATUS_LIST_FOR_SALE,
  CHANGE_STATUS_DELIST_FOR_SALE,
  CHANGE_STATUS_MAKE_OFFER,
  CHANGE_STATUS_CANCEL_OFFER,
  CHANGE_STATUS_ACCEPT_OFFER,
} from "../Actions/ContractActionStatus/types";

const initialState = {
  statusListForSale: false,
  statusDelistForSlae: false,
  statusMakeOffer: false,
  statusCancelOffer: false,
  statusAcceptOffer: false,
};

const contractActionStatus = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_STATUS_LIST_FOR_SALE:
      return {
        statusListForSale: payload,
      };
    case CHANGE_STATUS_DELIST_FOR_SALE:
      return {
        ...state,
        statusDelistForSlae: payload,
      };

    case CHANGE_STATUS_MAKE_OFFER:
      return {
        ...state,
        statusMakeOffer: payload,
      };
    case CHANGE_STATUS_CANCEL_OFFER:
      return {
        ...state,
        statusCancelOffer: payload,
      };
    case CHANGE_STATUS_ACCEPT_OFFER:
      return {
        ...state,
        statusAcceptOffer: payload,
      };

    default:
      return state;
  }
};

export default contractActionStatus;
