// TODO: Llevar esto a la configuración principal

import dotenv from 'dotenv';

import Web3 from 'web3';

// import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { config } from '../../config';

const client = dotenv.config({path: '../../../.env'}).parsed;
console.log('client: ', client);

console.log('config:', config);

const init = () => {
  const CONTRACT_INFO = require('../../contracts.json');

  const CONTRACT_ABI = CONTRACT_INFO.contracts.Burger.abi;
  const CONTRACT_ADDRESS = CONTRACT_INFO.contracts.Burger_Proxy.address;

  const CONTRACT_BURG_ABI = CONTRACT_INFO.contracts.BurgToken.abi;
  const CONTRACT_BURG_ADDRESS = CONTRACT_INFO.contracts.BurgToken_Proxy.address;
  // const web3Instance = new Web3(window.ethereum);

  let web3Instance;
  let wssWeb3Instance;
  if (process.env.ENVIRONMENT === 'development') {
    const web3ProviderHttp = new Web3.providers.HttpProvider(dotenv.TESTNET_HTTP_URL);
    web3Instance = new Web3(web3ProviderHttp);
    const web3ProviderWss = new Web3.providers.HttpProvider(dotenv.TESTNET_WSS_URL);
    wssWeb3Instance = new Web3(web3ProviderWss);
  } else if (process.env.ENVIRONMENT === 'production') {
    const web3ProviderHttp = new Web3.providers.HttpProvider(dotenv.MAINNET_HTTP_URL);
    web3Instance = new Web3(web3ProviderHttp);
    const web3ProviderWss = new Web3.providers.HttpProvider(dotenv.MAINNET_WSS_URL);
    wssWeb3Instance = new Web3(web3ProviderWss);
  }

  /*
  const web3Instance = createAlchemyWeb3(config.TESTNET_HTTP_URL);
  const wssWeb3Instance = createAlchemyWeb3(config.TESTNET_WSS_URL);
  */

  const nftContractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const wssNFTContractInstance = new wssWeb3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const burgTokenContractInstance = new web3Instance.eth.Contract(CONTRACT_BURG_ABI, CONTRACT_BURG_ADDRESS);

  return { web3Instance, nftContractInstance, wssWeb3Instance, wssNFTContractInstance, burgTokenContractInstance }
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
  ...init()
}

export const web3 = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: payload.provider,
        web3Provider: payload.web3Provider,
        address: payload.address,
        chainId: payload.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: payload,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: payload,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      return state;
  }
}

export const getProvider = (state) => {
  return state.web3.provider;
}

export const getWeb3Provider = (state) => {
  return state.web3.web3Provider;
}

export const getAddress = (state) => {
  return state.web3.address;
}

export const getChainId = (state) => {
  return state.web3.chainId;
}

export const getWeb3Instance = (state) => {
  return state.web3.web3Instance;
}

export const getContractAddress = (state) => {
  return state.web3.CONTRACT_ADDRESS;
}

export const getNFTContractInstance = (state) => {
  return state.web3.nftContractInstance;
}

export const getContractABI = (state) => {
  return state.web3.CONTRACT_ABI;
}

export const getWssNFTContractInstance = (state) => {
  return state.web3.wssNFTContractInstance;
}

export const getBurgTokenContractInstance = (state) => {
  return state.web3.burgTokenContractInstance;
}