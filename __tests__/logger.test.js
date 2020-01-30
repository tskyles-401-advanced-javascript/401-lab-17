'use strict';

require('../src/event');
const editFile = require('../src/app');

describe('logger', () => {
  xit('logs the payload on error', async () => {
    let file = `${__dirname}/src/testfile.md`;
    let spy = jest.spyOn(console, 'error');
    return editFile(file)
      .then(result => {
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
  });
  xit('logs the payload on error', async () => {
    let file = `${__dirname}/src/testfile.md`;
    let spy = jest.spyOn(console, 'log');
    return editFile(file)
      .then(result => {
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
  });
});