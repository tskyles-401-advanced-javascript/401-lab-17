'use strict';

require('../src/event');
const logger = require('../src/logger');

describe('logger', () => {
  it('creates a log on error with a payload', () => {
    let spy = jest.spyOn(console, 'log');
    logger('error', 'foo');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('creates a log without a payload', () => {
    let spy = jest.spyOn(console, 'log');
    logger('readFile');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});