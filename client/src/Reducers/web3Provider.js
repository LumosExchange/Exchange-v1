import {
    CREATE_PROVIDER,
    UPDATE_PROVIDER,
    DELETE_PROVIDER,
  } from "../Actions/Web3Provider/types";
  
  const initialState = {
      web3Provider: null
  };
  
  const web3Provider = (provider = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PROVIDER:
      case UPDATE_PROVIDER:
        console.log(payload);
        return {
            ...provider, 
            web3Provider: payload
        };
  
      case DELETE_PROVIDER:
        return {
            ...provider,
            web3Provider: null
        }
  
      default:
        return provider;
    }
  };
  
  export default web3Provider;