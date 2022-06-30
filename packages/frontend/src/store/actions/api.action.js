import { enableWhitelistMode, getBurgers, getWhitelistState, mintWhiteListMode } from '../../lib/nftutils';
import {apiService} from '../../services';
import { apiConstants } from '../constants';
import {mintNFT as mint} from '../../lib/nftutils';

function mintNFT(boxId, nftContractInstance, burgTokenContractInstance, address, onMintFail) {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        })
       
        mint(nftContractInstance, burgTokenContractInstance, address, boxId, onMintFail);
    };
}

function getTokensPerAddress(nftContractInstance, address) {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        });
        getBurgers(nftContractInstance, address).then(data => {
            dispatch({
                type: apiConstants.SET_TOKENLIST,
                payload: data
            });
        }, err => {
            dispatch({
                type: apiConstants.ERROR,
                payload: err
            });
        })
        
    };
}

const setLoading = (isLoading) => {
    return {
        type: apiConstants.SET_LOADING,
        payload: isLoading
    }
}

const isWhiteListMode = (nftContractInstance) => {
    return dispatch => {
        getWhitelistState(nftContractInstance).then(data => {
            dispatch({
                type: apiConstants.GET_WHITELISTSTATE,
                payload: data
            });
        }, err => {

        })
        
    }; 
}

const mintWhiteList = (boxId, nftContractInstance, address, onMintFail) => {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        })
        apiService.getWhiteListInfo(address).then(data => {
            const {proof} = data;
            const {verified} = data;
            const {leaf} = data;
            if (!verified) {
                dispatch({
                    type: apiConstants.ERROR,
                    payload: "You are not whitelist member!"
                });
                onMintFail('You are not whitelist member');
                return;
            }
            mintWhiteListMode(boxId, nftContractInstance,  address, proof, onMintFail)
        }, err => {
            console.log('err: ', err)
            dispatch({
                type: apiConstants.ERROR,
                payload: err
            });
            onMintFail('Mint is failed');
        })
    };
}

export const apiAction = {
    mintNFT,
    setLoading,
    getTokensPerAddress,
    isWhiteListMode,
    mintWhiteList
}