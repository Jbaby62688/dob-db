'use strict';

const {
  DobDbApi
} = require('../index');

test(
  'defined',
  () => {
    expect(DobDbApi).toBeDefined();
  }
);

test(
  'createClient',
  () => {
    let ret = DobDbApi.createClient(
      {
        name: 'test',
        config: {
          "dialect": "mysql",
          "host": "127.0.0.1",
          "port": 3306,
          "username": "mvp",
          "password": "mvp8*88*8",
          "database": "mvp",
          "timezone": "+08:00",
          "pool": {
            "min": 8,
            "max": 256
          }
        }
      }
    );

    expect(ret).toBe(true);
  }
);

test(
  'getClient',
  () => {
    let ret = DobDbApi.createClient(
      {
        name: 'test',
        config: {
          "dialect": "mysql",
          "host": "127.0.0.1",
          "port": 3306,
          "username": "mvp",
          "password": "mvp8*88*8",
          "database": "mvp",
          "timezone": "+08:00",
          "pool": {
            "min": 8,
            "max": 256
          }
        }
      }
    );

    expect(ret).toBe(true);

    ret = DobDbApi.getClient(
      {
        name: 'test'
      }
    );
    
    expect(ret).not.toBeNull();
  }
);