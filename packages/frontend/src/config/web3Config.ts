
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'

export const web3ProviderOptions = {
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://bsc-dataseed1.ninicoin.io`,
    },
    package: WalletLink,
    connector: async (_:any, options: any) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
}

let RPC_HTTP_URL;
let RPC_WSS_URL;

if (process.env.NODE_ENV === 'development' && process.env.NETWORK === 'rinkeby') {
    RPC_HTTP_URL = 'https://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3';
    RPC_WSS_URL = 'wss://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3';
} else if (process.env.NODE_ENV === 'development' && process.env.NETWORK === 'localhost') {
    RPC_HTTP_URL = 'wss://5.182.17.19:8545';
    RPC_WSS_URL = 'https://5.182.17.19:8545';
} else if (process.env.NODE_ENV === 'production') {
    RPC_HTTP_URL = 'https://speedy-nodes-nyc.moralis.io/7588301a76eb2417244244c0/bsc/mainnet';
    RPC_WSS_URL = 'wss://speedy-nodes-nyc.moralis.io/7588301a76eb2417244244c0/bsc/mainnet/ws';
}

export const config = {
    RPC_HTTP_URL: RPC_HTTP_URL,
    RPC_WSS_URL: RPC_WSS_URL
}


/*
const TESTNET_WSS_URL = "wss://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3"
const TESTNET_HTTP_URL = "https://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3";

const MAINNET_HTTP_URL = "https://eth-mainnet.alchemyapi.io/v2/OFNLvE3zh5eHRiBh30_DNaiPDVdyhXO0"
const MAINNET_WSS_URL = "wss://bsc-ws-node.nariox.org:443"

export const config = {
  MAINNET_HTTP_URL: MAINNET_HTTP_URL,
  TESTNET_HTTP_URL: TESTNET_HTTP_URL,

  MAINNET_WSS_URL: MAINNET_WSS_URL,
  TESTNET_WSS_URL: TESTNET_WSS_URL,
}
*/