'use strict';

const util = require('util');
const fs = require('fs');
const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('created app socket'));

let argv = process.argv;
let file = `${__dirname}/${argv[2]}`;

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

const readFile = (file) => read(file);
const writeFile = (file, buffer) => write(file, buffer);

/**
 * reads file and converts contents to uppercase
 * @function editFile
 * @param {*} file
 * 
 */
const editFile = (file) => {
  return readFile(file)
    .then(results => {
      let textBuffer = Buffer.from(results.toString().trim().toUpperCase());
      return writeFile(file, textBuffer)
        .then(results => {
          let payload = {
            event: 'saved',
            payload: 'file successfully changed and saved',
          };
          client.write(JSON.stringify(payload));
        })
        .catch(() => {
          let payload = {
            event: 'error',
            payload: 'error saving file',
          };
          client.write(JSON.stringify(payload));
        });
    })
    .catch(() => {
      let payload = {
        name: 'error',
        data: 'error changing file',
      };
      client.write(JSON.stringify(payload));
    });
};

editFile(file);
/** 
 * @module read/writeFile
*/
module.exports = editFile, readFile, writeFile;



