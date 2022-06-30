let REACT_APP_API_URL
let REACT_APP_SOCKET_SERVER_URL
let RPC_HTTP_URL;
let RPC_WSS_URL;

if (process.env.NODE_ENV === 'development' && process.env.NETWORK === 'rinkeby') {
    REACT_APP_API_URL = "http://localhost:8081/api";
    REACT_APP_SOCKET_SERVER_URL = "ws://localhost:3001/";
    RPC_HTTP_URL = 'https://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3';
    RPC_WSS_URL = 'wss://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3';
} else if (process.env.NODE_ENV === 'development' && process.env.NETWORK === 'localhost') {
    REACT_APP_API_URL = "http://localhost:8081/api";
    REACT_APP_SOCKET_SERVER_URL = "ws://localhost:3001/";
    RPC_HTTP_URL = 'wss://5.182.17.19:8545';
    RPC_WSS_URL = 'https://5.182.17.19:8545';
} else if (process.env.NODE_ENV === 'production') {
    REACT_APP_API_URL = "http://localhost:8080/api";
    REACT_APP_SOCKET_SERVER_URL = "ws://localhost:3000/";
    RPC_HTTP_URL = 'https://speedy-nodes-nyc.moralis.io/7588301a76eb2417244244c0/bsc/mainnet';
    RPC_WSS_URL = 'wss://speedy-nodes-nyc.moralis.io/7588301a76eb2417244244c0/bsc/mainnet/ws';
}

export const appConfig = {
    API_URL: REACT_APP_API_URL,
    SOCKET_URL: REACT_APP_SOCKET_SERVER_URL,
    RPC_HTTP_URL: RPC_HTTP_URL,
    RPC_WSS_URL: RPC_WSS_URL
}
