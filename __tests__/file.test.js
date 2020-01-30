'use strict';

jest.mock('fs');

const file = require('../src/app.js');

describe('read file', () => {

  it('can read a file', () => {
    return file.readFile('file.txt')
      .then(data => {
        expect(Buffer.isBuffer(data)).toBeTruthy();
      });
  });
  it('returns error when given a bad file', () => {
    return file.readFile('bad.txt')
      .then(data => {
        expect(Buffer.isBuffer(data)).toBeFalsy();
      })
      .catch(error => expect(error).toBe('Invalid File'));
  });
});

describe('write file', () => {

  it('writes data successfully', () => {
    return file.readFile('file.txt')
      .then(data => {
        let buffer = Buffer.from(data);
        return file.writeFile('file.txt', buffer)
          .then(results => {
            expect(results).toBeUndefined();
          });
      });
  });
  it('returns error on bad file', () => {
    return file.readFile('file.txt')
      .then(data => {
        let buffer = Buffer.from(data);
        return file.writeFile('bad.txt', buffer)
          .then(results => {
          })
          .catch(error => expect(error).toBe('Invalid File'));
      });
  });
  it('returns error on bad buffer', () => {
    return file.readFile('file.txt')
      .then(data => {
        return file.writeFile('bad.txt', data)
          .then(results => {
          })
          .catch(error => expect(error).toBe('Invalid File'));
      });
  });
});