'use strict';

const net = require('net');
const client = new net.Socket();
client.connect(3001, 'localhost', () => {});

client.on('data', function(data){
  let dataObj = JSON.parse(data);
  console.log(dataObj);
  if(dataObj.event === 'saved'){
    console.log(dataObj.payload);
  }
  if(dataObj.event === 'error'){
    console.error(dataObj.payload);
  }
});
