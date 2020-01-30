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
        console.log(data);
        expect(Buffer.isBuffer(data)).toBeFalsy();
      })
      .catch(error => expect(error).toBe('Invalid File'));
  });
});

describe('write file', () => {
  let spy;
  beforeEach(() => {
    jest.spyOn(console, 'log');
  });

  xit('writes data successfully', async () => {
    try{
      let data = await writeFile('test');
      expect(data).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    }
    catch(error){
      expect(error).not.toBeDefined();
    }
  });
  xit('writes data successfully', async () => {
    try{
      let data = await writeFile('test');
      expect(data).toBeFalsy();
    }
    catch(error){
      expect(error).toBeDefined();
      expect(spy).toHaveBeenCalled();
    }
  });
});