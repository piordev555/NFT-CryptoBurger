
const dotenv = require('dotenv').config({path: '../../.env'}).parsed;
const Web3  = require('web3');

let web3;
let wssWeb3;
if (process.env.ENVIRONMENT === 'development') {
    const web3ProviderHttp = new Web3.providers.HttpProvider(dotenv.TESTNET_HTTP_URL);
    web3 = new Web3(web3ProviderHttp);
    const web3ProviderWss = new Web3.providers.HttpProvider(dotenv.TESTNET_WSS_URL);
    wssWeb3 = new Web3(web3ProviderWss);
} else if (process.env.ENVIRONMENT === 'production') {
    const web3ProviderHttp = new Web3.providers.HttpProvider(dotenv.MAINNET_HTTP_URL);
    web3 = new Web3(web3ProviderHttp);
    const web3ProviderWss = new Web3.providers.HttpProvider(dotenv.MAINNET_WSS_URL);
    wssWeb3 = new Web3(web3ProviderWss);
}

module.exports = {
    web3,
    wssWeb3
};
