'use strict';

const net = require('net');
const port = 3001;

const server = net.createServer();

server.listen(port, () => console.log(`listening on ${port}`));

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  console.log('Welcome', id);
  socket.on('data', handleData);
  socket.on('error', (error) => {console.log('socket error', error);});
  socket.on('end', () => {
    delete socketPool[id];
    console.log(`Goodbye ${id}`);
  });
});
/**
 * parses buffer and puts into broadcast as argument
 * @function handleData
 * @param {*} buffer
 */
const handleData = (buffer) => {
  let message = JSON.parse(buffer.toString().trim());
  broadcast(message);
};
/**
 * writes messages for to broadcast
 * @function broadcast
 * @param {*} message
 */
function broadcast(message){
  let payload = JSON.stringify(message);
  for(let socket in socketPool){
    socketPool[socket].write(`${payload}`);
  }
}

server.on('error', (error) => {
  console.error('server error', error.message);
});