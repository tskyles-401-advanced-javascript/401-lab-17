'use strict';

const {readFile} = require('./src/app');
const {writeFile} = require('./src/app');
const event = require('./src/event');

require('./src/logger');

let argv = process.argv;
let file = `${__dirname}/src/${argv[2]}`;
/**
 *  reads and writes files
 *  @function editFile
 */
const editFile = () => {
  readFile(file)
    .then(results => {
      console.log(results);
      writeFile(file, results);
    })
    .catch(error => event.emit('error', error));
};

editFile();


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
  socket.on('error', (errer) => {console.log('socket error', error);});
  socket.on('end', () => {
    delete socketPool[id];
    console.log(`Goodbye ${id}`);
  });
});

const handleData = (buffer) => {
  let message = JSON.parse(buffer.toString().trim());
  broadcast(message);
};

function broadcast(message){
  let payload = JSON.stringify(message);
  for(let socket in socketPool){
    socketPool[socket].write(`${payload}`);
  }
}

server.on('error', (error) => {
  console.error('server error', error.message);
});
