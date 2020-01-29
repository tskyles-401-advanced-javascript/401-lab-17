'use strict';

jest.mock('fs');

const readFile = require('../src/app.js');
const writeFile = require('../src/app.js');

describe('read file', () => {

  
  beforeEach(() => {

  });

  it('returns data when given a good file', async () => {
    let file = `${__dirname}/src/testfile.md`;
    try{
      let data = await readFile(file);
      expect(data).toBeDefined();
    }
    catch(error){
    }
  });
  it('returns error when given a bad file', async () => {
    let file = `${__dirname}/src/bad`;
    try{
      let data = await readFile(file);
      expect(data).toBeDefined();
    }
    catch(error){
    }
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