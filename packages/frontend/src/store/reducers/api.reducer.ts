import { apiConstants } from "../constants"

const initialState = {
    isLoading: false,
    tokenList: [],
    error: '',
    isWhitelist: false
}

export const apiReducer = (state: any = initialState, {type, payload}: any) => {
    switch(type) {
        case apiConstants.SET_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        case apiConstants.SET_TOKENLIST:
            return {
                ...state,
                tokenList: payload,
                isLoading: false,
                error: ''
            }
        case apiConstants.ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case apiConstants.GET_WHITELISTSTATE:
            return {
                ...state,
                isWhitelist: payload
            }
        default:
            return state;
    }
}

export const getLoadingState = (state: any) => {
    return state.apiReducer.isLoading;
}

export const getTokenList = (state: any) => {
    return state.apiReducer.tokenList;
}

export const getError = (state: any) => {
    return state.apiReducer.error
}

export const isWhitelistMode = (state: any) => {
    return state.apiReducer.isWhitelist
}