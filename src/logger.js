'use strict';

const event = require('./event');

event.on('readFile', payload => log('readFile', payload));
event.on('writeFile', payload => log('writeFile', payload));
event.on('error', payload => log('error', payload));
/**
 * logs events
 * @param {*} event
 * @param {*} payload
 */
function log(event, payload){
  let time = new Date();
  console.log({event, time, payload});
}

module.exports = log;