import {appConfig} from '../config';
var web3Socket = null;

function getSocket(socketID) {
  if (web3Socket) {
    return web3Socket
  }
  web3Socket = new WebSocket(appConfig.SOCKET_URL);
  web3Socket.onopen = (e) => {
    web3Socket.send(JSON.stringify({
      msg: 'request connect',
      init: true,
      socketID
    }));
  }

  return web3Socket;
};

export default getSocket;