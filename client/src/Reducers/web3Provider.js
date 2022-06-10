import {
    CREATE_PROVIDER,
    UPDATE_PROVIDER,
    DELETE_PROVIDER,
    SET_WALLET_ADDRESS,
    SET_USER_LISTED_INFO,
} from "../Actions/Web3Provider/types";

const initialState = {
    web3Provider: null,
    walletAddress: null,
    userListedInfo: {}
};

const web3Provider = (provider = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PROVIDER:
        case UPDATE_PROVIDER:
            return {
                ...provider,
                web3Provider: payload,
            };

        case DELETE_PROVIDER:
            return {
                ...provider,
                web3Provider: null,
            };

        case SET_WALLET_ADDRESS:
            return {
                ...provider,
                walletAddress: payload,
            };
        case SET_USER_LISTED_INFO:
            return {
                ...provider,
                userListedInfo: payload,
            };
        default:
            return provider;
    }
};

export default web3Provider;