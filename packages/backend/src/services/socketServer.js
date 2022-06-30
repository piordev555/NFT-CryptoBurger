const WebSocket = require('ws')
const {v4: uuid4} = require('uuid');
const {socketConfig} = require('../config');
const wss = new WebSocket.Server({ port: socketConfig.SOCKET_PORT })
var clients = [];

console.log(
  'socket server listening on %d',
  socketConfig.SOCKET_PORT,
)

wss.on('connection', (ws) => {

  ws.on('message', (msg) => {
    let msgObj = JSON.parse(msg); 
    if (msgObj.init) {
      ws.id = msgObj.socketID;
      console.log('connected socket id - onmessage: ', ws.id);
      sendMessage(ws, {id: ws.id, type: 'SET_SOCKETID'});

      let client = clients.find(client => client.id === ws.id);
      if (!client) {
        clients.push(ws);
      }
    }
  });

  ws.on('close', function() {
    clients = clients.filter(client => client !== ws);
  });
  sendMessage(ws, 'hi! you are connected!');
})

wss.sendToRequester = (socketID, msg) => {
  console.log('SocketID: ', socketID);
  console.log('msg: ', msg);
 
  let client = clients.find(client => client.id === socketID);
  if (client) {
    sendMessage(client, msg);
  }
}

wss.sendBroadcast = (msg) => {
  for (client of clients) {
    sendMessage(client, msg);
  }
}

const sendMessage = (ws, msg) => {
  ws.send(JSON.stringify(msg));
}

module.exports = wss;